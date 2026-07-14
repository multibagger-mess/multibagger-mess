import 'package:flutter/material.dart';

import 'screens/home_screen.dart';

void main() {
  runApp(const SMSGatewayApp());
}

class SMSGatewayApp extends StatelessWidget {
  const SMSGatewayApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
  debugShowCheckedModeBanner: false,

  title: "The Multi-Bagger Mess",

  theme: ThemeData(
    useMaterial3: true,

    colorSchemeSeed: Colors.blue,

    scaffoldBackgroundColor:
        const Color(0xfff5f7fb),

    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
      backgroundColor: Colors.blue,
      foregroundColor: Colors.white,
    ),
  ),

  home: const HomeScreen(),
);
  }
}