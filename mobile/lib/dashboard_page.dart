import 'package:flutter/material.dart';
import 'log_exercise_page.dart';
import 'weekly_goals_page.dart';
//import 'progress.dart';

class DashboardPage extends StatefulWidget {
  final String userId;

  DashboardPage({required this.userId});

  @override
  _DashboardPageState createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int currentIndex = 0;

  late final List<Widget> pages;

  @override
  void initState() {
    super.initState();
    // Initialize the pages list with the userId passed to the forms
    pages = [
      Center(child: Text('Dashboard Content')),
      Center(child: Text('Progress Content')),
      WeeklyGoalsPage(userId: widget.userId),
      LogExercisePage(userId: widget.userId),
    ];
  }

  void onTabTapped(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
      ),
      body: Column(
        children: [
          // Navigation buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextButton(
                onPressed: () => onTabTapped(0),
                child: Text('Dashboard'),
              ),
              TextButton(
                onPressed: () => onTabTapped(1),
                child: Text('Progress'),
              ),
              TextButton(
                onPressed: () => onTabTapped(2),
                child: Text('Weekly Goals'),
              ),
              TextButton(
                onPressed: () => onTabTapped(3),
                child: Text('Log Exercise'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/home');
                },
                child: Text('Logout'),
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
