import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://localhost:9000/api/v1';

  // Function to register
  static Future<Map<String, dynamic>?> registerUser(String name, String email, String username, String password) async {
    final url = Uri.parse('$baseUrl/register');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'name': name, 
        'email': email, 
        'login': username,
        'password': password
        }),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      return {'error': response.body};
    }
  }

  // Function to login
  static Future<Map<String, dynamic>?> loginUser(String username, String password) async {
    final url = Uri.parse('$baseUrl/login');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'login': username, 
        'password': password
        }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      return {'error': response.body};
    }
  }
}
