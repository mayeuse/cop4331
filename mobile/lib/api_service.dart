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

  // Function to log an exercise
  static Future<Map<String, dynamic>?> addExercise({
    required String userId,
    required String type,
    required int calories,
  }) async {
    final url = Uri.parse('$baseUrl/exerciselog');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'userId': userId,
          'type': type,
          'calories': calories,
        }),
      );

      if (response.statusCode == 200) {
        return {'success': true};
      } else {
        return {'error': 'Failed to log exercise'};
      }
    } catch (e) {
      print('Log Exercise Error: $e');
      return {'error': 'Failed to connect to the server'};
    }
  }

  // Function to add a new goal
  static Future<Map<String, dynamic>?> addGoal({
    required String userId,
    required String type,
    required int target,
    required String units,
    required String interval,
  }) async {
    final url = Uri.parse('$baseUrl/goals');

    // Map the interval to match the expected string format
    /*String mappedInterval = '';
    switch (interval) {
      case 'WEEKLY':
        mappedInterval = 'WEEKLY';
        break;
      case 'BIWEEKLY':
        mappedInterval = 'BIWEEKLY';
        break;
      case 'MONTHLY':
        mappedInterval = 'MONTHLY';
        break;
      default:
        mappedInterval = 'WEEKLY'; // Default to WEEKLY if not specified
    }*/

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'userId': userId,
          'type': type,
          'target': target,
          'units': units,
          'interval': interval,
        }),
      );

      if (response.statusCode == 200) {
        return {'success': true};
      } else {
        print('API Error Response: ${response.body}');
        return {'error': 'Failed to add goal'};
      }
    } catch (e) {
      print('Add Goal Error: $e');
      return {'error': 'Failed to connect to the server'};
    }
  }

  // Function to fetch badges data
  static Future<List<dynamic>?> getUserBadges(String userId) async {
    final url = Uri.parse('$baseUrl/data/badges');

    try {
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'userId': userId // Send the userId in the headers if needed
        },
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        print('Failed to fetch badges');
        return null;
      }
    } catch (e) {
      print('Error fetching badges: $e');
      return null;
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
