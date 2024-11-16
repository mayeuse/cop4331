import 'package:flutter/material.dart';
import 'api_service.dart'; // Import your API service

class LoginPage extends StatefulWidget {
  // Add the key parameter
  //const LoginPage({super.key});
  
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String errorMessage = '';
  String successMessage = '';

  Future<void> handleLogin() async {
    final response = await ApiService.loginUser(
      usernameController.text,
      passwordController.text,
    );
    //if (mounted) {
      if (response != null && response['name'] != null) {
        setState(() {
          successMessage = 'Login successful! Welcome, ${response['name']}';
          errorMessage = '';
        });

        // Navigate to the Dashboard
        Navigator.pushReplacementNamed(context, '/dashboard');
      } else {
        setState(() {
          successMessage = '';
          errorMessage = response?['error'] ?? 'Invalid credentials';
        });
      }
    //}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
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
              onPressed: handleLogin,
              child: Text('Login'),
            ),
            if (successMessage.isNotEmpty)
              Text(successMessage, style: TextStyle(color: Colors.green)),
            if (errorMessage.isNotEmpty)
              Text(errorMessage, style: TextStyle(color: Colors.red)),

            // Add a "Forgot Password" button
            TextButton(
              onPressed: () {
                Navigator.pushNamed(context, '/forgotPassword');
              },
              child: Text('Forgot Password?'),
            ),
          ],
        ),
      ),
    );
  }
}
