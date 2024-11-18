import 'package:flutter/material.dart';

class TeamPage extends StatelessWidget {
  // List of team members with their details
  final List<Map<String, String>> teamMembers = [
    {
      'name': 'Roman Rosario',
      'role': 'Project Manager',
      'image': 'assets/images/Roman_Rosario.png',
    },
    {
      'name': 'Caleb Brandt',
      'role': 'Database',
      'image': 'assets/images/Caleb_Brandt.jpg',
    },
    {
      'name': 'Maya Eusebio',
      'role': 'API',
      'image': 'assets/images/Maya_Eusebio.png',
    },
    {
      'name': 'Gavin Mortensen',
      'role': 'API',
      'image': 'assets/images/Gavin_Mortensen.jpg',
    },
    {
      'name': 'Justin Wu',
      'role': 'Web-App',
      'image': 'assets/images/Justin_Wu.jpg',
    },
    {
      'name': 'Manas Korada',
      'role': 'Mobile',
      'image': 'assets/images/Manas_Korada.png',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [const Color(0xFFFBE68A), const Color(0xFFDAF89C)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Color(0xFFD0BD74), // Light brown background color
                borderRadius: BorderRadius.circular(12),
                boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 6)],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  // Title
                  Text(
                    'Our Team',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Colors.red,
                    ),
                  ),
                  SizedBox(height: 10),

                  /*// Description
                  Text(
                    'This is our group, we are people. That\'s about all you need to know about us.',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.red,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 20),*/

                  // Display team members
                  Column(
                    children: teamMembers.map((member) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Row(
                          children: [
                            // Circular profile image
                            CircleAvatar(
                              radius: 40,
                              backgroundImage: AssetImage(member['image']!),
                              backgroundColor: Colors.transparent,
                            ),
                            SizedBox(width: 16),

                            // Name and role
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  member['name']!,
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.red,
                                  ),
                                ),
                                Text(
                                  member['role']!,
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.green[800],
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    }).toList(),
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
