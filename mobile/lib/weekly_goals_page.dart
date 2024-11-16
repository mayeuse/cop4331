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
  final TextEditingController caloriesController = TextEditingController();
  String message = '';

  Future<void> handleSubmit() async {
    final String type = typeController.text;
    final int calories = int.tryParse(caloriesController.text) ?? 0;

    if (type.isEmpty || calories == 0) {
      setState(() {
        message = 'Please fill all fields';
      });
      return;
    }

    final response = await ApiService.submitForm(
      type: type,
      calories: calories,
      source: 'setGoal',
      userId: widget.userId,
    );

    setState(() {
      message = response?['error'] ?? 'Goal set successfully';
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
              controller: caloriesController,
              decoration: InputDecoration(labelText: 'Target Calories'),
              keyboardType: TextInputType.number,
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
