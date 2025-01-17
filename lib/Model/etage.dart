
import 'dart:convert';

List<Etage> EtageFromJson(String str) => List<Etage>.from(json.decode(str).map((x) => Etage.fromJson(x)));

String EtageToJson(List<Etage> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Etage {
    String id;
    String nom;
    List<String> places;

    Etage({
        required this.id,
        required this.nom,
        required this.places,
    });

    factory Etage.fromJson(Map<String, dynamic> json) => Etage(
        id: json["id"],
        nom: json["nom"],
        places: List<String>.from(json["places"].map((x) => x)),
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "nom": nom,
        "places": List<dynamic>.from(places.map((x) => x)),
    };
}