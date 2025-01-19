import 'dart:convert';

import 'package:flutter/material.dart';
import 'LoginPage.dart';
import 'ReservationPage.dart';
import '../../services/place.dart'; 
import '../../Model/place.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int availablePlaces = 0; // Compteur des places disponibles
  int occupiedPlaces = 0;  // Compteur des places occupées
  bool isLoading = false;
  List<Place> places =[];
  @override
  void initState() {
    super.initState();
    fetchPlaces(); // Charger les places dès le démarrage
  }

 void fetchPlaces() async {
  if (isLoading) return;  // Ne lance pas une nouvelle requête si déjà en cours
  setState(() {
    isLoading = true;
  });

  try {
    // Récupérer le nombre de places vides et occupées
    final emptyCount = await EtageService.getPlaceCountEmty();
    final occupiedCount = await EtageService.getPlaceCountOcup();

    setState(() {
      availablePlaces = 7; 
      occupiedPlaces = 3; 
      isLoading = false;
    });
  } catch (e) {
    setState(() {
      isLoading = false;
    });
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Color(0xFF1A3C97),
        elevation: 0,
        toolbarHeight: 80,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Image.asset(
              "assets/images/preepark.png",
              width: 150,
            ),
            Row(
              children: [
                Text(
                  "Malek",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                SizedBox(width: 10),
                IconButton(
                  icon: Icon(Icons.logout, color: Colors.white),
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => LoginPage()),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/images/parking.jpg"),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Container(
            color: Colors.white.withOpacity(0),
          ),
          Center(
            child: Container(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Bloc vert
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.green,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: EdgeInsets.all(16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.directions_car,
                          size: 50,
                          color: Colors.white,
                        ),
                        Text(
                          "6", 
                          style: TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 20),
                  // Bloc rouge
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: EdgeInsets.all(16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Stack(
                          alignment: Alignment.center,
                          children: [
                            Icon(
                              Icons.directions_car,
                              size: 50,
                              color: Colors.white,
                            ),
                            Transform.rotate(
                              angle: -0.785398, // -45 degrés en radians
                              child: Container(
                                width: 60,
                                height: 5,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          "4", 
                          style: TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ReservationPage()),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color.fromARGB(177, 26, 59, 151),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      padding: EdgeInsets.all(16),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.check_circle,
                          size: 50,
                          color: Colors.white,
                        ),
                        SizedBox(width: 10),
                        Text(
                          "Réserver",
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
