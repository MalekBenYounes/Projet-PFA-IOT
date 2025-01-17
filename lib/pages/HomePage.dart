import 'package:flutter/material.dart';
import 'LoginPage.dart';
import 'ReservationPage.dart';

class HomePage extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Color(0xFF1A3C97), // Fond blanc pour l'AppBar
        elevation: 0, // Supprime l'ombre de l'AppBar
        toolbarHeight: 80, // Ajuste la hauteur de l'AppBar
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Image à gauche
            Image.asset(
              "assets/images/preepark.png", // Remplacez par le chemin réel de l'image
              width: 150,
            ),
            // Nom et icône de logout à droite
            Row(
              children: [
                Text(
                  "Nom",
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
                    // Redirige vers la page LoginPage
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
          // Image de fond
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/images/parking.jpg"), // Image de fond
                fit: BoxFit.cover,
              ),
            ),
          ),
          // Superposition blanche semi-transparente
          Container(
            color: Colors.white.withOpacity(0),
          ),
          // Contenu principal
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
                      borderRadius:
                          BorderRadius.circular(10), // Radius des coins
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
                          "8",
                          style: TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 20), // Espacement entre les blocs
                  // Bloc rouge
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius:
                          BorderRadius.circular(10), // Radius des coins
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
                          "19",
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
                  //button de reservation
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ReservationPage()),
                      );
                      // Action à exécuter lors du clic sur le bouton
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor:
                          Color.fromARGB(177, 26, 59, 151), // Couleur de fond
                      shape: RoundedRectangleBorder(
                        borderRadius:
                            BorderRadius.circular(10), // Radius des coins
                      ),
                      padding: EdgeInsets.all(16), // Espacement interne
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min, // Ne pas étirer le bouton
                      children: [
                        Icon(
                          Icons.check_circle,
                          size: 50,
                          color: Colors.white,
                        ),
                        SizedBox(
                            width: 10), // Espacement entre l'icône et le texte
                        Text(
                          "Réserver",
                          style: TextStyle(
                            fontSize:
                                20, // Ajustez la taille du texte si nécessaire
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