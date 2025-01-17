import 'package:flutter/material.dart';
import 'package:app_mobile/pages/LoginPage.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
       
        scaffoldBackgroundColor: const Color(0xFF1A3C97),
        primaryColor: const Color(0xFF1A3C97),
      ),
      home: LoginPage(),
    );
  }
}

