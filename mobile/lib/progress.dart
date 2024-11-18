import 'package:flutter/material.dart';
import 'api_service.dart';
import 'package:intl/intl.dart';

class ProgressPage extends StatefulWidget {
  final String userId;


  // Add a constructor that accepts a GlobalKey
  const ProgressPage({Key? key, required this.userId}) : super(key: key);

  @override
  ProgressPageState createState() => ProgressPageState();
}

class ProgressPageState extends State<ProgressPage> {
  List<Map<String, dynamic>> exerciseLog = [];
  Map<String, dynamic> goals = {};
  String message = '';

  @override
  void initState() {
    super.initState();
    fetchUserData();
  }

  // Method to fetch user data
  Future<void> fetchUserData() async {
    final response = await ApiService.fetchUserData(widget.userId);
    if (response != null && response['error'] == null) {
      setState(() {
        exerciseLog = List<Map<String, dynamic>>.from(response['exerciseLog'] ?? []);
        goals = Map<String, dynamic>.from(response['goals'] ?? {});
      });
    } else {
      setState(() {
        message = response?['error'] ?? 'Error fetching data';
      });
    }
  }

  // Function to format date string
  String formatDateString(String dateString) {
    try {
      DateTime parsedDate = DateTime.parse(dateString);
      return DateFormat('MM/dd/yyyy').format(parsedDate);
    } catch (e) {
      return dateString; // Return the original string if parsing fails
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
          child: Center(
            child: Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Color(0xFFD0BD74), // Light brown color for the box
                borderRadius: BorderRadius.circular(8),
                boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 4)],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Display Goals
                  Text(
                    'Your Goals',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.red),
                  ),
                  SizedBox(height: 10),
                  ...goals.entries.map((goal) {
                    return Container(
                      padding: EdgeInsets.all(12),
                      margin: EdgeInsets.only(bottom: 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Type: ${goal.key}', style: TextStyle(fontWeight: FontWeight.bold)),
                          Text('Target: ${goal.value['target']} ${goal.value['units']}'),
                          Text('Interval: ${formatDateString(goal.value['interval'])}'),
                        ],
                      ),
                    );
                  }).toList(),

                  SizedBox(height: 20),

                  // Display Exercise Log
                  Text(
                    'Exercise Log',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.red),
                  ),
                  SizedBox(height: 10),
                  ...exerciseLog.map((exercise) {
                    return Container(
                      padding: EdgeInsets.all(12),
                      margin: EdgeInsets.only(bottom: 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Type: ${exercise['type']}', style: TextStyle(fontWeight: FontWeight.bold)),
                          Text('Calories: ${exercise['calories']}'),
                          Text('Date: ${exercise['date']}'),
                        ],
                      ),
                    );
                  }).toList(),

                  if (message.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(top: 20.0),
                      child: Text(
                        message,
                        style: TextStyle(color: Colors.red),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
