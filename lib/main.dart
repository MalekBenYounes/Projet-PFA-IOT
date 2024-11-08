import 'package:flutter/material.dart';
import 'package:simulateur/Model/etage.dart';
import 'package:simulateur/services/place.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'Model/place.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Simulateur Parking',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSwatch().copyWith(
          primary: const Color(0xff0b2a63),
        ),
      ),
      home: const MyHomePage(title: 'Simulateur Parking'),
    );
  }
}

const String assetName = 'assets/no-data.svg';
final Widget svg = SvgPicture.asset(assetName, semanticsLabel: 'No Data');

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int selecteditem = 0;
  String selectedflor = "";
  List<Place> ListPlaces = []; // Liste pour toutes les places
  List<Etage> etages = [];
  bool is_loading = false;

  // Fetching places
  Future<void> fetchPlacesMethod() async {
    setState(() {
      is_loading = true;
    });
    try {
      final value = await EtageService.fetchPlace();
      setState(() {
        etages = value;
        is_loading = false;
        if (etages.isNotEmpty) {
          selectedflor = etages[0].nom;
        }
      });
    } catch (e) {
      setState(() {
        is_loading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur lors du chargement des données: $e')),
      );
    }
  }

  void changeFlore(bool up) {
    setState(() {
      selecteditem = up ? 1 : 0;
    });
  }

  void changeF(bool up) {
    setState(() {
      selecteditem += up ? -1 : 1;
    });
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
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: is_loading
          ? const Center(child: CircularProgressIndicator()) // Loading spinner
          : etages.isEmpty
              ? Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      svg,
                      SizedBox(
                        height: MediaQuery.of(context).size.height * 0.1,
                        width: MediaQuery.of(context).size.width * 0.2,
                        child: ElevatedButton(
                          onPressed: () {
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                TextEditingController _nameController =
                                    TextEditingController();
                                TextEditingController _numberController =
                                    TextEditingController();

                                return AlertDialog(
                                  title: const Text('Ajouter un nouvel étage'),
                                  content: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      TextFormField(
                                        controller: _nameController,
                                        decoration: const InputDecoration(
                                          hintText: 'Nom de l\'étage',
                                        ),
                                      ),
                                      TextFormField(
                                        controller: _numberController,
                                        keyboardType: TextInputType.number,
                                        decoration: const InputDecoration(
                                          hintText: 'Nombre de places',
                                        ),
                                      ),
                                    ],
                                  ),
                                  actions: <Widget>[
                                    TextButton(
                                      child: const Text('Fermer'),
                                      onPressed: () {
                                        Navigator.of(context).pop();
                                      },
                                    ),
                                    TextButton(
                                      child: const Text('OK'),
                                      onPressed: () async {
                                        String name = _nameController.text;
                                        int? number = int.tryParse(
                                            _numberController.text);
                                        if (name.isNotEmpty && number != null) {
                                          await EtageService.addEtage(name, number);
                                          await fetchPlacesMethod();
                                          Navigator.of(context).pop();
                                        } else {
                                          ScaffoldMessenger.of(context).showSnackBar(
                                            const SnackBar(
                                              content: Text('Données invalides !'),
                                            ),
                                          );
                                        }
                                      },
                                    ),
                                  ],
                                );
                              },
                            );
                          },
                          child: const Text('Ajouter un étage'),
                        ),
                      )
                    ],
                  ),
                )
              : Row(
                  children: [
                    // Etage List
                    Column(
                      children: [
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.85,
                          width: MediaQuery.of(context).size.width * 0.2,
                          child: ListView.builder(
                            itemCount: etages.length,
                            itemBuilder: (BuildContext context, int index) {
                              final e = etages[index];

                              return InkWell(
                                onTap: () {
                                  setState(() {
                                    selecteditem = index;
                                    selectedflor = e.nom;
                                  });
                                },
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: ListTile(
                                        selected: selecteditem == index,
                                        leading: const Icon(Icons.local_parking),
                                        title: Text("Etage ${e.nom}"),
                                      ),
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.edit),
                                      onPressed: () {
                                        TextEditingController _numberController =
                                            TextEditingController();

                                        showDialog(
                                          context: context,
                                          builder: (BuildContext context) {
                                            return AlertDialog(
                                              title: const Text('Modifier nombre de places'),
                                              content: TextFormField(
                                                controller: _numberController,
                                                keyboardType: TextInputType.number,
                                                decoration: const InputDecoration(
                                                  hintText: 'Nombre de places',
                                                ),
                                              ),
                                              actions: <Widget>[
                                                TextButton(
                                                  child: const Text('Fermer'),
                                                  onPressed: () {
                                                    Navigator.of(context).pop();
                                                  },
                                                ),
                                                TextButton(
                                                  child: const Text('OK'),
                                                  onPressed: () async {
                                                    int? number = int.tryParse(_numberController.text);
                                                    if (number != null) {
                                                      await EtageService.updateEtage(e.id, number);
                                                      await fetchPlacesMethod();
                                                      Navigator.of(context).pop();
                                                    } else {
                                                      ScaffoldMessenger.of(context).showSnackBar(
                                                        const SnackBar(
                                                          content: Text('Saisissez un nombre valide !'),
                                                        ),
                                                      );
                                                    }
                                                  },
                                                ),
                                              ],
                                            );
                                          },
                                        );
                                      },
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.delete),
                                      onPressed: () {
                                        showDialog(
                                          context: context,
                                          builder: (BuildContext context) {
                                            return AlertDialog(
                                              title: const Text("Suppression"),
                                              content: const Text("Êtes-vous sûr de vouloir supprimer cet étage ?"),
                                              actions: <Widget>[
                                                TextButton(
                                                  child: const Text('Oui'),
                                                  onPressed: () async {
                                                    await EtageService.deleteEtage(e.nom);
                                                    await fetchPlacesMethod();
                                                    Navigator.of(context).pop();
                                                  },
                                                ),
                                                TextButton(
                                                  child: const Text('Non'),
                                                  onPressed: () {
                                                    Navigator.of(context).pop();
                                                  },
                                                ),
                                              ],
                                            );
                                          },
                                        );
                                      },
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                    // Place Grid
                    Expanded(
                      child: GridView.builder(
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 7,
                        ),
                        itemCount: etages[selecteditem].places.length,
                        itemBuilder: (context, index) {
                          final p = etages[selecteditem].places[index];

                         return InkWell(
  onTap: () async {
    await EtageService.updatePlace(p);
    await fetchPlacesMethod();
  },
  child: Center(
    child: Card(
      // color: p ? Colors.green : Colors.red,
      child: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Expanded(
              child: Icon(Icons.time_to_leave, size: 60),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                '${index+1} - ${etages[selecteditem].nom}',
                style: const TextStyle(fontSize: 30),
              ),
            ),
          ],
        ),
      ),
    ),
  ),
);

                    },
                  ),
                )
              ],
            ),
    );
  }
}
