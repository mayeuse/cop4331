import 'package:flutter/material.dart';
import 'api_service.dart';

class ForgotPasswordPage extends StatefulWidget {
  @override
  _ForgotPasswordPageState createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final TextEditingController emailController = TextEditingController();
  String message = '';

  Future<void> handleForgotPassword() async {
    final response = await ApiService.forgotPassword(emailController.text);

    setState(() {
      if (response != null && response['error'] == 'Password Reset Email Sent') {
        message = 'Password reset link has been sent to your email.';
      } else {
        message = response?['error'] ?? 'An error occurred. Please try again.';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Forgot Password')),
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
                controller: emailController,
                decoration: InputDecoration(labelText: 'Enter your email'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: handleForgotPassword,
                child: Text('Send Password Reset Email'),
              ),
              if (message.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 20.0),
                  child: Text(
                    message,
                    style: TextStyle(color: Colors.green),
                    textAlign: TextAlign.center,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
