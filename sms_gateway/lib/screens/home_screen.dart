import 'package:flutter/material.dart';
import '../models/gateway_status.dart';
import '../widgets/status_card.dart';
import '../widgets/action_button.dart';
import '../widgets/sms_tile.dart';
import '../services/permission_service.dart';
import '../services/gateway_service.dart';
import '../utils/ip_utils.dart';
import '../widgets/gateway_info_card.dart';
import '../models/sms_job.dart';
import '../services/sms_service.dart';
import '../services/native_sms_service.dart';
import 'dart:async';
import 'package:intl/intl.dart';

class HomeScreen extends StatefulWidget {

  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();

}

class _HomeScreenState extends State<HomeScreen> {

  final GatewayStatus gatewayStatus = GatewayStatus();
  final GatewayService gatewayService = GatewayService();
  final SmsService smsService = SmsService();

  Timer? pollingTimer;
  Timer? heartbeatTimer;

  List<SmsJob> pendingJobs = [];

 List<SmsJob> recentActivity = [];

String formatDateTime(DateTime? dateTime) {

  if (dateTime == null) {

    return "";

  }

  return DateFormat(
    "dd MMM yyyy • hh:mm a",
  ).format(dateTime);

}

@override
void initState() {

  super.initState();

  WidgetsBinding.instance.addPostFrameCallback((_) {

    startGateway();

  });

}

Future<void> startGateway() async {

  if (gatewayService.isRunning) {

  debugPrint("Gateway already running.");

  return;

}

    ScaffoldMessenger.of(context).showSnackBar(
  const SnackBar(
    content: Text("Start Gateway Pressed"),
  ),
);

  bool granted =
      await PermissionService.requestSmsPermission();

      debugPrint("Permission Granted = $granted");

  if (!mounted) return;

  if (!granted) {

    ScaffoldMessenger.of(context).showSnackBar(

      const SnackBar(

        content: Text(

          "SMS permission is required.",

        ),

      ),

    );

    return;

  }

    await gatewayService.start();
    
    pollingTimer?.cancel();

pollingTimer = Timer.periodic(

  const Duration(seconds: 5),

  (_) async {

    if (gatewayService.isRunning) {

      await loadPendingJobs();

      await loadGatewayStats();

      await loadRecentActivity();

    }

  },

);

heartbeatTimer?.cancel();

heartbeatTimer = Timer.periodic(

  const Duration(seconds: 30),

  (_) async {

    if (gatewayService.isRunning) {

      await gatewayService.sendHeartbeat();

      debugPrint(
    "❤️ Heartbeat sent at ${DateTime.now()}");

    }

  },

);

    debugPrint("🟢 Gateway Started");

    final response = await NativeSmsService.ping();

    debugPrint("Native response: $response");

    await loadPendingJobs();

    await loadGatewayStats();

    await loadRecentActivity();

    await gatewayService.sendHeartbeat();

    final ip = await IPUtils.getLocalIp();

    if (!mounted) return;

    setState(() {

      gatewayStatus.isRunning = gatewayService.isRunning;

      gatewayStatus.ipAddress = ip;

      gatewayStatus.port = 8080;

      gatewayStatus.statusMessage =
          "Waiting for requests...";
    });

}



Future<void> stopGateway() async {

  await gatewayService.stop();

    pollingTimer?.cancel();

    heartbeatTimer?.cancel();

    setState(() {

      gatewayStatus.isRunning = gatewayService.isRunning;

      gatewayStatus.ipAddress =
          "Unavailable";

      gatewayStatus.statusMessage =
          "Gateway Offline";
    });

}


Future<void> loadPendingJobs() async {

  final jobs = await gatewayService.fetchPendingJobs();

  setState(() {
    pendingJobs = jobs;
  });

  debugPrint("📋 Pending Jobs = ${jobs.length}");

  for (final job in jobs) {

    debugPrint("Phone : ${job.phone}");
    debugPrint("Message : ${job.message}");

    bool sent = await smsService.sendSms(

  phone: job.phone,

  message: job.message,

);

if (sent) {

  debugPrint("📩 SMS sent to ${job.phone}");

  await gatewayService.updateSmsJob(

    id: job.id,

    status: "SENT",

  );

}

else {

  debugPrint("SMS failed");

  await gatewayService.updateSmsJob(

    id: job.id,

    status: "FAILED",

    error: "Android SMS failed",

  );

}

  }

}

    Future<void> loadGatewayStats() async {

  final stats =
      await gatewayService.fetchGatewayStats();

  if (!mounted) return;

  setState(() {

    gatewayStatus.smsSent =
        stats["sent"];

    gatewayStatus.pendingSms =
        stats["pending"];

    gatewayStatus.failedSms =
        stats["failed"];

  });

}

    Future<void> loadRecentActivity() async {

  final activity = await gatewayService.fetchRecentActivity();

  if (!mounted) return;

  setState(() {

    recentActivity = activity;

  });

}

   @override
    void dispose() {

      pollingTimer?.cancel();

      heartbeatTimer?.cancel();

      super.dispose();

    }

    @override
    Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("The Multi-Bagger Mess"),
        centerTitle: true,
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),

        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [

            const SizedBox(height: 10),

            const Icon(
              Icons.sms,
              size: 80,
              color: Colors.blue,
            ),

            const SizedBox(height: 15),

            const Text(
              "SMS Gateway",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 30),

            StatusCard(
              connected: gatewayStatus.isRunning,
            ),

            const SizedBox(height: 30),

            Card(
              elevation: 5,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              child: Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [

                    Text(
                      "Today's Statistics",
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    SizedBox(height: 20),

                    Row(
                      mainAxisAlignment:
                          MainAxisAlignment.spaceAround,
                      children: [

                        Column(
                          children: [
                            Text(
                              "${gatewayStatus.smsSent}",
                              style: TextStyle(
                                fontSize: 26,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text("Sent"),
                          ],
                        ),

                        Column(
                          children: [
                            Text(
                              "${gatewayStatus.pendingSms}",
                              style: TextStyle(
                                fontSize: 26,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text("Pending"),
                          ],
                        ),

                        Column(
                          children: [
                            Text(
                              "${gatewayStatus.failedSms}",
                              style: TextStyle(
                                fontSize: 26,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text("Failed"),
                          ],
                        ),

                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),

            GatewayInfoCard(
              ipAddress: gatewayStatus.ipAddress,
              port: gatewayStatus.port,
              status: gatewayStatus.statusMessage,
            ),

            const SizedBox(height: 30),

            ActionButton(
              text: "Start Gateway",
              icon: Icons.play_arrow,
              color: Colors.green,
              onPressed: startGateway,
            ),

            const SizedBox(height: 15),

            ActionButton(
              text: "Stop Gateway",
              icon: Icons.stop,
              color: Colors.red,
              onPressed: stopGateway,
            ),

            const SizedBox(height: 30),

            const Text(
              "Recent Activity",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 15),

           Card(
  child: Column(
    children: [

      if (recentActivity.isEmpty)

        const SmsTile(
          title: "No SMS sent yet",
          icon: Icons.sms,
          iconColor: Colors.grey,
        )

      else

        ...recentActivity.map(

          (job) {

            IconData icon;

            Color color;

            if (job.status == "SENT") {

              icon = Icons.check_circle;

              color = Colors.green;

            } else if (job.status == "FAILED") {

              icon = Icons.cancel;

              color = Colors.red;

            } else {

              icon = Icons.schedule;

              color = Colors.orange;

            }

            return SmsTile(

              title: job.status,

              subtitle:
                      "📱 ${job.phone}\n🕒 ${formatDateTime(job.sentAt)}",

              icon: icon,

              iconColor: color,

            );

          },

        ),

    ],
  ),
),

            const SizedBox(height: 40),

          ],
        ),
      ),
    );
  }
}