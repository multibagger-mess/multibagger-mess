import 'package:flutter/material.dart';
import '../models/gateway_status.dart';
import '../widgets/status_card.dart';
import '../widgets/action_button.dart';
import '../widgets/sms_tile.dart';
import '../services/permission_service.dart';


class HomeScreen extends StatefulWidget {

  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();

}

class _HomeScreenState extends State<HomeScreen> {

  final GatewayStatus gatewayStatus =
    GatewayStatus();
    
  Future<void> startGateway() async {

  bool granted =
      await PermissionService.requestSmsPermission();

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

  setState(() {

    gatewayStatus.isRunning = true;

  });

}



void stopGateway() {

  setState(() {

    gatewayStatus.isRunning = false;

  });

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