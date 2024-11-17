import 'package:flutter/material.dart';
import 'login_page.dart';
import 'register_page.dart';
import 'team_page.dart';
//import 'package:tailwind_cli/tailwind_cli.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentIndex = 0;

  // List of pages to show below the buttons
  final List<Widget> pages = [
    Center(child: Text('Welcome to the Home Page')),
    RegisterPage(),
    LoginPage(),
    TeamPage(),
  ];

  void onTabTapped(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My App'),
      ),
      body: Column(
        children: [
          // Navigation buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextButton(
                onPressed: () => onTabTapped(0),
                child: Text('Home'),
              ),
              TextButton(
                onPressed: () => onTabTapped(1),
                child: Text('Register'),
              ),
              TextButton(
                onPressed: () => onTabTapped(2),
                child: Text('Login'),
              ),
              TextButton(
                onPressed: () => onTabTapped(3),
                child: Text('Our Team'),
              ),
            ],
          ),
          Divider(),
          // Dynamic content area
          Expanded(
            child: IndexedStack(
              index: currentIndex,
              children: pages,
            ),
          ),
        ],
      ),
    );
  }
}
