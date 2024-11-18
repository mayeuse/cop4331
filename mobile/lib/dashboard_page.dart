import 'package:flutter/material.dart';
import 'log_exercise_page.dart';
import 'add_goal_page.dart';
import 'dash.dart';
import 'progress.dart';

class DashboardPage extends StatefulWidget {
  final String userId;

  DashboardPage({required this.userId});

  @override
  _DashboardPageState createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int currentIndex = 0;

  late final List<Widget> pages;
  final GlobalKey<ProgressPageState> progressKey = GlobalKey<ProgressPageState>();

  @override
  void initState() {
    super.initState();
    // Initialize the pages list with the userId passed to the forms
    pages = [
      Dash(),
      ProgressPage(key: progressKey, userId: widget.userId),
      AddGoalPage(userId: widget.userId),
      LogExercisePage(userId: widget.userId),
    ];
  }

  void onTabTapped(int index) {
    setState(() {
      currentIndex = index;
      if (index == 1) {
        // Refresh data for the progress page
        progressKey.currentState?.fetchUserData();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome!'),
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
                child: Text('Add Goals'),
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
