import 'package:flutter/material.dart';
import 'api_service.dart';

class LogExercisePage extends StatefulWidget {
  final String userId;

  LogExercisePage({required this.userId});

  @override
  _LogExercisePageState createState() => _LogExercisePageState();
}

class _LogExercisePageState extends State<LogExercisePage> {
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

    final response = await ApiService.addExercise(
      userId: widget.userId,
      type: type,
      calories: calories,
    );


    setState(() {
      message = response?['success'] == true
          ? 'Exercise logged successfully'
          : response?['error'] ?? 'Failed to log exercise';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Log Exercise')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: typeController,
              decoration: InputDecoration(labelText: 'Exercise Type'),
            ),
            TextField(
              controller: caloriesController,
              decoration: InputDecoration(labelText: 'Calories Burned'),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: handleSubmit,
              child: Text('Log Exercise'),
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
