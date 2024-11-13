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
    final response = await ApiService.registerUser(
      nameController.text,
      emailController.text,
      usernameController.text,
      passwordController.text,
    );

    //if (mounted) {
      if (response != null && response['message'] != null) {
        setState(() {
          successMessage = response['message'];
          errorMessage = '';
        });

        // Optionally, navigate to the login screen after registration
        Navigator.pushReplacementNamed(context, '/login');
      } else {
        setState(() {
          successMessage = '';
          errorMessage = response?['error'] ?? 'Registration failed';
        });
      }
    //}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Register')),
      body: Padding(
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
    );
  }
}
