import 'package:flutter/material.dart';

class SmsTile extends StatelessWidget {

  final String title;

  final IconData icon;

  final Color iconColor;

  final String? subtitle;

  const SmsTile({

    super.key,

    required this.title,

    required this.icon,

    required this.iconColor,

    this.subtitle,

  });

  @override
  Widget build(BuildContext context) {

    return Card(

      margin: const EdgeInsets.symmetric(

        horizontal: 10,

        vertical: 6,

      ),

      elevation: 2,

      child: ListTile(

        leading: CircleAvatar(

          backgroundColor: iconColor.withOpacity(0.15),

          child: Icon(

            icon,

            color: iconColor,

          ),

        ),

        title: Text(

          title,

          style: const TextStyle(

            fontWeight: FontWeight.bold,

          ),

        ),

        subtitle: subtitle == null

            ? null

            : Text(subtitle!),

      ),

    );

  }

}