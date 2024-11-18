import 'package:flutter/material.dart';
import 'api_service.dart';

class RegisterPage extends StatefulWidget {
  //const RegisterPage({super.key});

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String errorMessage = '';
  String successMessage = '';

  Future<void> handleRegister() async {
  try {
    // Call the registerUser function from your ApiService
    final response = await ApiService.registerUser(
      nameController.text,
      emailController.text,
      usernameController.text,
      passwordController.text,
    );

    // Debugging print statements to see the API response
    print('API Response: $response');

    // Updated check to handle API response correctly
    if (response != null && response['id'] != null && response['id'] != '') {
      setState(() {
        successMessage = 'Registration successful! Please verify email and login.';
        errorMessage = '';
      });

      // Adding a small delay before navigation to ensure setState completes
      await Future.delayed(Duration(milliseconds: 100));

      // Navigate to the login page
      //Navigator.pushReplacementNamed(context, '/login');
    } else {
      setState(() {
        successMessage = '';
        errorMessage = response?['error'] ?? 'Registration failed';
      });
    }
  } catch (e) {
    // Catch any errors and display them
    print('Registration Error: $e');
    setState(() {
      successMessage = '';
      errorMessage = 'An unexpected error occurred. Please try again.';
    });
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Register')),
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
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextField(
                controller: nameController,
                decoration: InputDecoration(labelText: 'Full Name'),
              ),
              TextField(
                controller: emailController,
                decoration: InputDecoration(labelText: 'Email'),
              ),
              TextField(
                controller: usernameController,
                decoration: InputDecoration(labelText: 'Username'),
              ),
              TextField(
                controller: passwordController,
                decoration: InputDecoration(labelText: 'Password'),
                obscureText: true,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: handleRegister,
                child: Text('Register'),
              ),
              if (successMessage.isNotEmpty)
                Text(successMessage, style: TextStyle(color: Colors.green)),
              if (errorMessage.isNotEmpty)
                Text(errorMessage, style: TextStyle(color: Colors.red)),
            ],
          ),
        ),
      ),
    );
  }
}
