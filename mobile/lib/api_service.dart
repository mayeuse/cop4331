import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://localhost:9000/api/v1';

  // Function to register
  static Future<Map<String, dynamic>?> registerUser(
      String name, String email, String username, String password) async {
    final url = Uri.parse('$baseUrl/register');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': name,
          'email': email,
          'login': username,
          'password': password,
        }),
      );

      // Check if the response body is empty
      if (response.body.isEmpty) {
        print('Empty Response Body');
        return {'error': 'Empty response from server'};
      }

      // Attempt to parse the response body
      try {
        final Map<String, dynamic> responseBody = jsonDecode(response.body);

        // Print the parsed response for debugging
        print('Parsed API Response: $responseBody');

        // Ensure 'id' is treated as a String
        if (responseBody.containsKey('id')) {
          responseBody['id'] = responseBody['id']?.toString() ?? '';
        }

        // Ensure that 'error' is a string as well
        if (responseBody.containsKey('error')) {
          responseBody['error'] = responseBody['error']?.toString() ?? '';
        }

        return responseBody;
      } catch (e) {
        print('JSON Parsing Error: $e');
        return {'error': 'Malformed JSON response from server'};
      }
    } catch (e) {
      print('API Call Error: $e');
      return {'error': 'Failed to connect to the server'};
    }
  }

  // Function to login
  static Future<Map<String, dynamic>?> loginUser(String username, String password) async {
    final url = Uri.parse('$baseUrl/login');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'login': username, 
          'password': password
          }),
      );

      // Check if the response is successful
      if (response.statusCode == 200) {
        final responseBody = jsonDecode(response.body);

        // Debugging: print the parsed response
        print('Login Response: $responseBody');

        // Ensure 'id' and 'name' are returned
        if (responseBody.containsKey('id') && responseBody.containsKey('name')) {
          return {
            'id': responseBody['id'].toString(),
            'name': responseBody['name'],
            'error': null
          };
        } else {
          return {'error': 'User ID or Name not found'};
        }
      } else {
        return {'error': jsonDecode(response.body)['error'] ?? 'Invalid credentials'};
      }
    } catch (e) {
      print('Login Error: $e');
      return {'error': 'Failed to connect to the server'};
    }
  }

  // Function to send a password reset email
  static Future<Map<String, dynamic>?> forgotPassword(String email) async {
    final url = Uri.parse('$baseUrl/forgotPassword');
    
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email}),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('Forgot Password Error: $e');
      return {'error': 'Failed to send password reset email'};
    }
  }

  // Function to submit the form for logging exercise or setting goals
  static Future<Map<String, dynamic>?> submitForm({
    required String type,
    required int calories,
    required String source,
    required String userId,
  }) async {
    final url = Uri.parse('$baseUrl/newForm');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          '_id': userId, // Passing the user ID in the headers
        },
        body: jsonEncode({
          'type': type,
          'calories': calories,
          'source': source,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('Form Submission Error: $e');
      return {'error': 'Failed to submit form'};
    }
  }

  /*
  // Function to reset the password
  static Future<Map<String, dynamic>?> resetPassword(
      String newPassword, String confirmPassword, String userEmail) async {
    final url = Uri.parse('$baseUrl/passwordReset?user=$userEmail');
    
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'newPassword': newPassword,
          'confirmPassword': confirmPassword,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('Password Reset Error: $e');
      return {'error': 'Failed to reset password'};
    }
  }
  */

}
