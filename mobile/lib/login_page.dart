import 'package:flutter/material.dart';
import 'api_service.dart'; // Import your API service
import 'dashboard_page.dart';

class LoginPage extends StatefulWidget {
  // Add the key parameter
  //const LoginPage({super.key});
  
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController loginController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String errorMessage = '';
  String successMessage = '';

  Future<void> handleLogin() async {
    final login = loginController.text;
    final password = passwordController.text;

    if (login.isEmpty || password.isEmpty) {
      setState(() {
        errorMessage = 'Please fill in all fields';
      });
      return;
    }

    final response = await ApiService.loginUser(login, password);
    
    //if (mounted) {
      if (response != null && response['id'] != null) {
        setState(() {
          successMessage = 'Login successful! Welcome, ${response['name']}';
          errorMessage = '';
        });

        // Navigate to the Dashboard
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => DashboardPage(userId: response['id']),
          ),
        );
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
                controller: loginController,
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
      ),
    );
  }
}
