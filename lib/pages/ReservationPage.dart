import 'package:flutter/material.dart';
import 'HomePage.dart';
import 'LoginPage.dart';
import '../../services/place.dart'; // Importez vos services
import '../../Model/place.dart'; // Importez vos modèles
import '../../Model/etage.dart';
import 'PayementPage.dart'; // Importez vos modèles

class ReservationPage extends StatefulWidget {
  @override
  _ReservationPageState createState() => _ReservationPageState();
}

class _ReservationPageState extends State<ReservationPage> {
  int selectedItem = 0;
  String selectedFloor = "";
  List<Place> listPlaces = [];
  List<Etage> etages = [];
  bool isLoading = false;

  // Index de la place sélectionnée
  int? selectedPlaceIndex;

  // Fetching places
  Future<void> fetchPlacesMethod() async {
    if (isLoading) return;  // Ne lance pas une nouvelle requête si déjà en cours
    setState(() {
      isLoading = true;
    });
    try {
      final value = await EtageService.fetchPlace();
      setState(() {
        etages = value;
        if (etages.isNotEmpty) {
          selectedFloor = etages[0].nom;
          selectedItem = 0; // Sélectionne le premier étage par défaut
        }
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur lors du chargement des données : $e')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchPlacesMethod();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => HomePage()),
            );
          },
          color: Colors.white, // Change la couleur de l'icône à blanc
        ),
        backgroundColor: const Color(0xFF1A3C97),
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
                const Text(
                  "Malek ",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(width: 10),
                IconButton(
                  icon: const Icon(Icons.logout, color: Colors.white),
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
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Liste horizontale des étages en haut
                SizedBox(
                  height: MediaQuery.of(context).size.height *
                      0.15, // Taille réduite
                  child: SingleChildScrollView(
                    scrollDirection:
                        Axis.horizontal, // Définit le défilement horizontal
                    child: Row(
                      children: List.generate(etages.length, (index) {
                        final e = etages[index];
                        return InkWell(
                          onTap: () {
                            // Ne refaites pas setState si vous êtes déjà sur cet étage
                            if (selectedItem != index) {
                              setState(() {
                                selectedItem = index;
                                selectedFloor = e.nom;
                                selectedPlaceIndex = null; // Réinitialise la sélection des places
                              });
                            }
                          },
                          child: Card(
                            color: selectedItem == index
                                ? Colors.blueAccent.shade100
                                : Colors.white,
                            child: Padding(
                              padding: const EdgeInsets.all(
                                  4.0), 
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.local_parking,
                                      size: 24), 
                                  Text("Étage ${e.nom}",
                                      style: const TextStyle(
                                          fontSize: 12)), 
                                ],
                              ),
                            ),
                          ),
                        );
                      }),
                    ),
                  ),
                ),

                // Grille des places
                Expanded(
                  child: GridView.builder(
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 4,
                    ),
                    itemCount: etages.isNotEmpty
                        ? etages[selectedItem].places.length
                        : 0,
                    itemBuilder: (context, index) {
                      final p = etages[selectedItem].places[index];

                      return FutureBuilder<Place>(
                        future: EtageService.fetchPlaces(p),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState == 
                              ConnectionState.waiting) {
                            return const Center(
                                child: CircularProgressIndicator());
                          } else if (snapshot.hasError) {
                            return Center(
                              child: Text('Erreur: ${snapshot.error}'),
                            );
                          } else if (snapshot.hasData) {
                            final place = snapshot.data!;
                            return InkWell(
                              onTap: () async {
                                setState(() {
                                  // Si on clique à nouveau sur l'élément sélectionné, on désélectionne
                                  if (selectedPlaceIndex == index) {
                                    selectedPlaceIndex = null;
                                  } else {
                                    // Sinon, sélectionne l'élément uniquement si etat == true
                                    if (place.place.etat) {
                                      selectedPlaceIndex = index;
                                    }
                                  }
                                });
                              },
                              child: Card(
                                color: selectedPlaceIndex == index
                                    ? Colors.green // Change en vert si sélectionné
                                    : place.place.etat
                                        ? const Color.fromARGB(255, 245, 246, 245)
                                        : const Color.fromARGB(255, 103, 103, 103),
                                child: Center(
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const Icon(Icons.time_to_leave, size: 48),
                                      Text(
                                        '${index + 1} - ${etages[selectedItem].nom}',
                                        style: const TextStyle(fontSize: 14),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            );
                          } else {
                            return const Center(
                              child: Text('Pas de données disponibles'),
                            );
                          }
                        },
                      );
                    },
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    // Redirige vers la page de paiement
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              PaymentPage()), // Remplacez PaymentPage par votre page de paiement
                    );
                  },
                  child: const Text('Payer'),
                ),
                SizedBox(height: 20),
              ],
            ),
    );
  }
}
