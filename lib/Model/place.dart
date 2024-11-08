import 'dart:convert';

// Fonction pour décoder une liste de `Place` à partir d'une chaîne JSON
List<Place> placeListFromJson(String str) =>
    List<Place>.from(json.decode(str).map((x) => Place.fromJson(x)));

// Fonction pour encoder une liste de `Place` en une chaîne JSON
String placeListToJson(List<Place> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Place {
  String id;
  int num;
  bool etat;
  String owner;

  Place({
    required this.id,
    required this.num,
    required this.etat,
    required this.owner,
  });

  factory Place.fromJson(Map<String, dynamic> json) => Place(
        id: json["id"],
        num: json["num"],
        etat: json["etat"],
        owner: json["owner"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "num": num,
        "etat": etat,
        "owner": owner,
      };
}
