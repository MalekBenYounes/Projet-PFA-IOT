import '../Model/etage.dart';
import '../Model/place.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class EtageService {
  // Récupération de tous les étages
  static Future<List<Etage>> fetchPlace() async {
    print("fetch etages");
    var response = await http.get(Uri.parse('http://10.0.2.2:3000/api/etages'));
    print("reponse : ");
    print(response.statusCode);
    
    if (response.statusCode == 200) {
      print("Connexion réussie ! Etages récupérés");
      print(response.body);
      final etage = EtageFromJson(response.body);
      return etage;
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<int> getPlaceCountEmty() async {
    final response = await http.get(Uri.parse('http://10.0.2.2:3000/api/places/empty'));

    if (response.statusCode == 200) {
      // Si la requête est réussie, on décode la réponse JSON
      final data = json.decode(response.body);
      return data['emptyCount']; // Récupérer le nombre de places vides
    } else {
      throw Exception('Failed to load empty places count');
    }
  }


  static Future<int> getPlaceCountOcup() async {
    final response = await http.get(Uri.parse('http://10.0.2.2:3000/api/places/occupied'));

    if (response.statusCode == 200) {
      // Si la requête est réussie, on décode la réponse JSON
      final data = json.decode(response.body);
      return data['occupiedCount']; // Récupérer le nombre de places occupées
    } else {
      throw Exception('Failed to load occupied places count');
    }
  }

  // Récupérer une place
  static Future<Place> fetchPlaces(String id) async {
    print("fetch places");
    var response =
        await http.get(Uri.parse('http://10.0.2.2:3000/api/places/$id'));

    if (response.statusCode == 200) {
      print("Connexion réussie ! Places récupérées");
      // Utilisation de placeListFromJson pour récupérer la liste d'objets Place
      final place = placeFromJson(response.body);
      print(place);
      return place;
    } else {
      throw Exception('Échec de la récupération des places');
    }
  }

  // Mise à jour d'une place
  static Future<void> updatePlace(String id) async {
    try {
      await http.put(Uri.parse('http://10.0.2.2:3000/api/places/update/$id'));
    } catch (err) {
      throw Exception('Failed to update');
    }
  }
}
