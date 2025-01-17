// To parse this JSON data, do
//
//     final user = userFromJson(jsonString);

import 'dart:convert';

User userFromJson(String str) => User.fromJson(json.decode(str));

String userToJson(User data) => json.encode(data.toJson());

class User {
    UserClass user;
    String token;

    User({
        required this.user,
        required this.token,
    });

    factory User.fromJson(Map<String, dynamic> json) => User(
        user: UserClass.fromJson(json["user"]),
        token: json["token"],
    );

    Map<String, dynamic> toJson() => {
        "user": user.toJson(),
        "token": token,
    };
}

class UserClass {
    String id;
    String email;
    String groupe;
    String motPass;
    String nom;
    String prenom;

    UserClass({
        required this.id,
        required this.email,
        required this.groupe,
        required this.motPass,
        required this.nom,
        required this.prenom,
    });

    factory UserClass.fromJson(Map<String, dynamic> json) => UserClass(
        id: json["id"],
        email: json["email"],
        groupe: json["groupe"],
        motPass: json["mot_pass"],
        nom: json["nom"],
        prenom: json["prenom"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "email": email,
        "groupe": groupe,
        "mot_pass": motPass,
        "nom": nom,
        "prenom": prenom,
    };
}
