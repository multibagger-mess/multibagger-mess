import 'package:flutter/material.dart';

class StatusCard extends StatelessWidget {
  final bool connected;

  const StatusCard({
    super.key,
    required this.connected,
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
        child: Row(
          children: [

            Icon(
              connected
                  ? Icons.check_circle
                  : Icons.cancel,
              color: connected
                  ? Colors.green
                  : Colors.red,
              size: 40,
            ),

            const SizedBox(width: 20),

            Expanded(
              child: Column(
                crossAxisAlignment:
                    CrossAxisAlignment.start,
                children: [

                  const Text(
                    "Gateway Status",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),

                  Text(
                    connected
                        ? "Running"
                        : "Offline",
                    style: const TextStyle(
                      fontSize: 18,
                    ),
                  ),

                ],
              ),
            )

          ],
        ),
      ),
    );
  }
}