import 'package:flutter/material.dart';
import 'api_service.dart';

class AddGoalPage extends StatefulWidget {
  final String userId;

  AddGoalPage({required this.userId});

  @override
  _AddGoalPageState createState() => _AddGoalPageState();
}

class _AddGoalPageState extends State<AddGoalPage> {
  final TextEditingController targetController = TextEditingController();
  //final TextEditingController unitsController = TextEditingController();

  String selectedGoalType = 'calorie';
  String selectedInterval = 'WEEKLY';
  String message = '';

  final List<String> goalTypes = ['calorie', 'stepcount'];
  final List<String> intervals = ['WEEKLY', 'BIWEEKLY', 'MONTHLY'];

  Future<void> handleAddGoal() async {
    final int target = int.tryParse(targetController.text) ?? 0;
    //final String units = unitsController.text;

    if (target <= 0 /*|| units.isEmpty*/) {
      setState(() {
        message = 'Please fill all fields correctly';
      });
      return;
    }

    final response = await ApiService.addGoal(
      userId: widget.userId,
      type: selectedGoalType,
      target: target,
      //units: units,
      interval: selectedInterval,
    );

    setState(() {
      message = response?['success'] == true
          ? 'Goal added successfully'
          : response?['error'] ?? 'Failed to add goal';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Add New Goal')),
      body: Container(
        height: MediaQuery.of(context).size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [const Color(0xFFFBE68A), const Color(0xFFDAF89C)],
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
          ),
        ),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              // Dropdown for Goal Type
              DropdownButtonFormField<String>(
                value: selectedGoalType,
                decoration: InputDecoration(labelText: 'Goal Type'),
                items: goalTypes.map((type) {
                  return DropdownMenuItem<String>(
                    value: type,
                    child: Text(type == 'calorie' ? 'Calories' : 'Step Count'),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    selectedGoalType = value!;
                  });
                },
              ),
              SizedBox(height: 10),

              // Input for Target
              TextField(
                controller: targetController,
                decoration: InputDecoration(labelText: 'Target (number)'),
                keyboardType: TextInputType.number,
              ),
              SizedBox(height: 10),

              /*// Input for Units
              TextField(
                controller: unitsController,
                decoration: InputDecoration(labelText: 'Units (e.g., reps, steps)'),
              ),
              SizedBox(height: 10),*/

              // Dropdown for Interval
              DropdownButtonFormField<String>(
                value: selectedInterval,
                decoration: InputDecoration(labelText: 'Interval'),
                items: intervals.map((interval) {
                  return DropdownMenuItem<String>(
                    value: interval,
                    child: Text(interval),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    selectedInterval = value!;
                  });
                },
              ),
              SizedBox(height: 20),

              // Submit Button
              ElevatedButton(
                onPressed: handleAddGoal,
                child: Text('Add Goal'),
              ),

              // Message Display
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
      ),
    );
  }
}
