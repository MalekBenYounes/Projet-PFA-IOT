import 'dart:convert';
import 'package:simulateur/Model/etage.dart';
import 'package:simulateur/Model/place.dart';
import 'package:http/http.dart' as http;

class EtageService {
  // Récupération de tous les étages
  static Future<List<Etage>> fetchPlace() async {
    var response = await http.get(Uri.parse('http://localhost:3000/api/etages'));
    if (response.statusCode == 200) {
      print("Connexion réussie ! Etages récupérés");
      print(response.body);
      final etage = EtageFromJson(response.body);
      return etage;
    } else {
      throw Exception('Failed to load data');
    }
  }

  // Récupérer la liste des places 
 static Future<List<Place>> fetchPlaces() async {
  var response = await http.get(Uri.parse('http://localhost:3000/api/places'));

  if (response.statusCode == 200) {
    print("Connexion réussie ! Places récupérées");
    // Utilisation de placeListFromJson pour récupérer la liste d'objets Place
    final placeList = placeListFromJson(response.body);
    print(placeList);
    return placeList;
  } else {
    throw Exception('Échec de la récupération des places');
  }
}



  // Mise à jour d'une place (aucun corps de requête dans cet exemple)
  static Future<void> updatePlace(String id) async {
    try {
      await http.put(Uri.parse('http://localhost:3000/api/places/update/$id'));
    } catch (err) {
      throw Exception('Failed to update');
    }
  }

  // Suppression d'un étage par nom
  static Future<void> deleteEtage(String nom) async {
    try {
      await http.delete(Uri.parse('http://localhost:3000/api/etages/delete/$nom'));
    } catch (err) {
      throw Exception('Failed to delete');
    }
  }

  // Ajout d'un nouvel étage
  static Future<void> addEtage(String nom, int np) async {
    try {
      final data = {
        'nom': nom.toUpperCase(),
        'np': np,
      };
      await http.post(
        Uri.parse('http://localhost:3000/api/etages/'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(data),
      );
    } catch (err) {
      throw Exception('Failed to add');
    }
  }

  // Mise à jour d'un étage avec un nouvel ID et nombre de places
  static Future<void> updateEtage(String id, int np) async {
    try {
      final data = {
        'id': id,
        'np': np,
      };
      await http.put(
        Uri.parse('http://localhost:3000/api/etages/update/'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(data),
      );
    } catch (err) {
      throw Exception('Failed to update');
    }
  }
}
