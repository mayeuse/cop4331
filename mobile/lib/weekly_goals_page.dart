import 'package:flutter/material.dart';
import 'api_service.dart';

class WeeklyGoalsPage extends StatefulWidget {
  final String userId;

  WeeklyGoalsPage({required this.userId});

  @override
  _WeeklyGoalsPageState createState() => _WeeklyGoalsPageState();
}

class _WeeklyGoalsPageState extends State<WeeklyGoalsPage> {
  final TextEditingController typeController = TextEditingController();
  final TextEditingController targetController = TextEditingController();
  final TextEditingController intervalController = TextEditingController();
  String message = '';

  Future<void> handleSubmit() async {
    final String type = typeController.text;
    final int target = int.tryParse(targetController.text) ?? 0;
    final String interval = intervalController.text;

    if (type.isEmpty || target == 0 || interval.isEmpty) {
      setState(() {
        message = 'Please fill all fields';
      });
      return;
    }

    final response = await ApiService.addGoal(
      userId: widget.userId,
      type: type,
      target: target,
      interval: interval,
    );

    setState(() {
      message = response?['success'] == true
          ? 'Goal set successfully'
          : response?['error'] ?? 'Failed to set goal';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Set Weekly Goal')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: typeController,
              decoration: InputDecoration(labelText: 'Goal Type'),
            ),
            TextField(
              controller: targetController,
              decoration: InputDecoration(labelText: 'Target (e.g., calories)'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: intervalController,
              decoration: InputDecoration(labelText: 'Interval (e.g., Daily, Weekly)'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: handleSubmit,
              child: Text('Set Goal'),
            ),
            if (message.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: Text(
                  message,
                  style: TextStyle(color: message.contains('successfully') ? Colors.green : Colors.red),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
