// To parse this JSON data, do
//
//     final place = placeFromJson(jsonString);

import 'dart:convert';

Place placeFromJson(String str) => Place.fromJson(json.decode(str));

String placeToJson(Place data) => json.encode(data.toJson());

class Place {
    PlaceClass place;

    Place({
        required this.place,
    });

    factory Place.fromJson(Map<String, dynamic> json) => Place(
        place: PlaceClass.fromJson(json["place"]),
    );

    Map<String, dynamic> toJson() => {
        "place": place.toJson(),
    };
}

class PlaceClass {
    String id;
    int num;
    bool etat;
    String owner;

    PlaceClass({
        required this.id,
        required this.num,
        required this.etat,
        required this.owner,
    });

    factory PlaceClass.fromJson(Map<String, dynamic> json) => PlaceClass(
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
