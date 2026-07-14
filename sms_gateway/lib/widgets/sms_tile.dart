import 'package:flutter/material.dart';

class SmsTile extends StatelessWidget {

  final String title;

  const SmsTile({

    super.key,

    required this.title,

  });

  @override
  Widget build(BuildContext context) {

    return ListTile(

      leading: const Icon(

        Icons.sms,

        color: Colors.blue,

      ),

      title: Text(title),

    );

  }

}