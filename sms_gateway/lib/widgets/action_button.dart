import 'package:flutter/material.dart';

class ActionButton extends StatelessWidget {

  final String text;

  final IconData icon;

  final Color color;

  final VoidCallback onPressed;

  const ActionButton({

    super.key,

    required this.text,

    required this.icon,

    required this.color,

    required this.onPressed,

  });

  @override
  Widget build(BuildContext context) {

    return SizedBox(

      width: double.infinity,

      child: ElevatedButton.icon(

        icon: Icon(icon),

        label: Text(text),

        style: ElevatedButton.styleFrom(

          backgroundColor: color,

          foregroundColor: Colors.white,

          padding: const EdgeInsets.symmetric(

            vertical: 18,

          ),

          shape: RoundedRectangleBorder(

            borderRadius:
                BorderRadius.circular(15),

          ),

        ),

        onPressed: onPressed,

      ),

    );

  }

}