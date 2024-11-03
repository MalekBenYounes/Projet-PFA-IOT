import 'dart:convert';
import 'package:simulateur/Model/etage.dart';
import 'package:http/http.dart' as http;

class EtageService {
  static Future<List<Etage>> fetchPlace() async {
    
    var response =
        await http.get(Uri.parse('http://localhost:3000/api/etages'));
    if (response.statusCode == 200) {
      final etage = etageFromJson(response.body);
      return etage;
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<void> updatePlace(String id) async {

    try {

      await http.put(Uri.parse('http://localhost:3000/api/places/update/$id'));
    } catch (err) {
      throw Exception('Failed to update');
    }
  }

  static Future<void> deleteEtage(String nom) async {

    
    try {
      await http
          .delete(Uri.parse('http://localhost:3000/api/etages/delete/$nom'));
    } catch (err) {
      throw Exception('Failed to delete');
    }
  }

  static Future<void> addEtage(String nom, int np) async {
    try {
      
      final data = {
    'nom': nom.toUpperCase(),
    'np': np,
  };
      await http.post(Uri.parse('http://localhost:3000/api/etages/'),headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(data),);
    } catch (err) {
      throw Exception('Failed to add');
    }
  }

  static Future<void> updateEtage(String id, int np) async {
  
    try{
      final data = {
    'id': id,
    'np': np,
  };
      await http.put(Uri.parse('http://localhost:3000/api/etages/update/'),headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(data),);

    }catch(err){
      throw Exception('Failed to update');
    }
  }
  }