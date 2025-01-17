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

  
  // Fonction pour récupérer le nombre de places vides et occupées
 static Future<Map<String, int>?> getPlaceCounts() async {
    try {
      // Appel à l'API ou à la source de données
      final response = await http.get(Uri.parse('VOTRE_API_URL'));

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);

        // Vérifiez si les clés existent dans la réponse
        if (data != null && data.containsKey('emptyCount') && data.containsKey('occupiedCount')) {
          return {
            'emptyCount': data['emptyCount'] as int,
            'occupiedCount': data['occupiedCount'] as int,
          };
        } else {
          throw Exception('Données manquantes dans la réponse');
        }
      } else {
        throw Exception('Erreur lors de la récupération des données');
      }
    } catch (e) {
      throw Exception('Erreur lors de la récupération des places : $e');
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
