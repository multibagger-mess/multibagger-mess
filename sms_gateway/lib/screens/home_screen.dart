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

class HomeScreen extends StatefulWidget {

  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();

}

class _HomeScreenState extends State<HomeScreen> {

  final GatewayStatus gatewayStatus = GatewayStatus();
  final GatewayService gatewayService = GatewayService();
  final SmsService smsService = SmsService();
  List<SmsJob> pendingJobs = [];
    
  Future<void> startGateway() async {

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
    debugPrint("Gateway started");

    final response = await NativeSmsService.ping();

    debugPrint("Native response: $response");

    await loadPendingJobs();

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

  debugPrint("Pending Jobs = ${jobs.length}");

  for (final job in jobs) {

    debugPrint("Phone : ${job.phone}");
    debugPrint("Message : ${job.message}");

    bool sent = await smsService.sendSms(

      phone: job.phone,

      message: job.message,

    );

    if (sent) {

      debugPrint("SMS sent successfully");

    } else {

      debugPrint("SMS failed");

    }

  }

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

            const Card(
              child: Column(
                children: [

                  SmsTile(
                    title: "No SMS sent yet",
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