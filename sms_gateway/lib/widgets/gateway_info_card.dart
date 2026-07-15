import 'package:flutter/material.dart';

class GatewayInfoCard extends StatelessWidget {

  final String ipAddress;
  final int port;
  final String status;

  const GatewayInfoCard({
    super.key,
    required this.ipAddress,
    required this.port,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {

    return Card(

      elevation: 5,

      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),

      child: Padding(

        padding: const EdgeInsets.all(20),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            const Text(
              "Gateway Information",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 20),

            const Text(
              "IP Address",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),

            Text(ipAddress),

            const SizedBox(height: 15),

            const Text(
              "Port",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),

            Text(port.toString()),

            const SizedBox(height: 15),

            const Text(
              "Status",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),

            Text(status),

          ],

        ),

      ),

    );

  }

}