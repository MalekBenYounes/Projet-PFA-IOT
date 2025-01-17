import '../Model/user.dart';
import 'dart:convert'; // Pour encoder et décoder JSON
import 'package:http/http.dart' as http;

class AuthService {
  static Future<User?> login(String email, String motPasse) async {
    final String url = 'http://10.0.2.2:3000/api/users/login';
    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"email": email, "mot_pass": motPasse}),
      );

      if (response.statusCode == 200) {
       final  user = userFromJson(response.body);
      } else {
        throw Exception('Erreur ${response.statusCode} : ${response.body}');
      }
    } catch (e) {
      print('Erreur lors de la connexion : $e');
      return null;
    }
  }
}
