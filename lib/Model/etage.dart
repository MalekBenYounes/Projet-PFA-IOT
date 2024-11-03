// To parse this JSON data, do
//
//     final etage = etageFromJson(jsonString);

import 'dart:convert';

List<Etage> etageFromJson(String str) => List<Etage>.from(json.decode(str).map((x) => Etage.fromJson(x)));

String etageToJson(List<Etage> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Etage {
    Etage({
        required this.id,
        required this.nom,
        required this.places,
        required this.v,
    });

    String id;
    String nom;
    List<Place> places;
    int v;

    factory Etage.fromJson(Map<String, dynamic> json) => Etage(
        id: json["_id"],
        nom: json["nom"],
        places: List<Place>.from(json["places"].map((x) => Place.fromJson(x))),
        v: json["__v"],
    );

    Map<String, dynamic> toJson() => {
        "_id": id,
        "nom": nom,
        "places": List<dynamic>.from(places.map((x) => x.toJson())),
        "__v": v,
    };
}


class Place {
    Place({
        required this.id,
        required this.num,
        required this.etat,
        required this.owner,
        required this.v,
    });

    String id;
    int num;
    bool etat;
    String owner;
    int v;

    factory Place.fromJson(Map<String, dynamic> json) => Place(
        id: json["_id"],
        num: json["num"],
        etat: json["etat"],
        owner: json["owner"],
        v: json["__v"],
    );

    Map<String, dynamic> toJson() => {
        "_id": id,
        "num": num,
        "etat": etat,
        "owner": owner,
        "__v": v,
    };
}