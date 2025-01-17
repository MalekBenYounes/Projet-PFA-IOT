import 'dart:async';
import 'package:flutter/material.dart';

import 'HomePage.dart';

class PaymentPage extends StatefulWidget {
  @override
  _PaymentPageState createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> {
  late Timer _timer;
  int _remainingTime = 15 * 60; // 15 minutes en secondes

  String getFormattedTime() {
    final minutes = (_remainingTime ~/ 60).toString().padLeft(2, '0');
    final seconds = (_remainingTime % 60).toString().padLeft(2, '0');
    return "$minutes min. $seconds sec.";
  }

  @override
  void initState() {
    super.initState();
    startCountdown();
  }

  void startCountdown() {
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (_remainingTime > 0) {
        setState(() {
          _remainingTime--;
        });
      } else {
        _timer.cancel();
        // Action après la fin du compte à rebours
        print("Temps écoulé !");
      }
    });
  }

  @override
  void dispose() {
    _timer
        .cancel(); // Assurez-vous de nettoyer le timer pour éviter les fuites de mémoire
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Paiement"),
      ),
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Compte à rebours dynamique
            Text(
              "Il reste jusqu'à la fin de la session ${getFormattedTime()}",
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 20),
            // Numéro de la carte
            TextField(
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: "Numéro de la carte",
              ),
            ),
            SizedBox(height: 20),
            // Mois, Année et Code de sécurité
            Row(
              children: [
                // Mois
                Expanded(
                  child: DropdownButtonFormField<String>(
                    items: List.generate(
                      12,
                      (index) => DropdownMenuItem(
                        value: (index + 1).toString().padLeft(2, '0'),
                        child: Text((index + 1).toString().padLeft(2, '0')),
                      ),
                    ),
                    onChanged: (value) {},
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: "Mois",
                    ),
                  ),
                ),
                SizedBox(width: 10),
                // Année
                Expanded(
                  child: DropdownButtonFormField<String>(
                    items: List.generate(
                      10,
                      (index) => DropdownMenuItem(
                        value: (DateTime.now().year + index).toString(),
                        child: Text((DateTime.now().year + index).toString()),
                      ),
                    ),
                    onChanged: (value) {},
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: "Année",
                    ),
                  ),
                ),
                SizedBox(width: 10),
                // Code de sûreté
                Expanded(
                  child: TextField(
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: "Code de sûreté",
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            // Nom du détenteur
            TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: "Le nom du détenteur",
              ),
            ),
            SizedBox(height: 20),
            // Adresse e-mail
            CheckboxListTile(
              value: true,
              onChanged: (value) {},
              title: Text("Adresse e-mail"),
            ),
            TextField(
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: "Adresse e-mail",
              ),
            ),
            Spacer(),
            // Bouton de paiement
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  print("Paiement effectué !");
                  MaterialPageRoute(builder: (context) => HomePage());
                },
                child: Text("Paiement"),
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 16),
                  textStyle: TextStyle(fontSize: 18),
                  backgroundColor: Color(0xFF1A3C97),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
