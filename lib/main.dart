import 'package:flutter/material.dart';
import 'package:simulateur/Model/etage.dart';
import 'package:simulateur/services/place.dart';
import 'package:flutter_svg/flutter_svg.dart';


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
  List<Etage> etages = [];
  bool is_loading = false;
   

  Future<void> fetchPlacesMethod() async {
    final p = EtageService.fetchPlace().then((value) => {
          setState(() {
            etages = value;
            is_loading = false;
            if (etages.isNotEmpty) {
              selectedflor = etages[0].nom;
            }
          }),
        });
  }

  void changeFlore(bool up) {
    if (up) {
      setState(() {
        selecteditem = 1;
      });
    } else {
      setState(() {
        selecteditem = 0;
      });
    }
  }

  void changeF(bool up) {
    if (up) {
      setState(() {
        selecteditem--;
      });
    } else {
      setState(() {
        selecteditem++;
      });
    }
  }

 
  @override
  void initState() {
    setState(() {
      is_loading = true;
    });
  
    super.initState();
    fetchPlacesMethod().then((value) => print('done'));
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: etages.isEmpty
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
                            //aficher le modal
                            TextEditingController _numberController =
                                TextEditingController();
                            TextEditingController _nameController =
                                TextEditingController();

                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: const Text('Ajouter un nouvel etage'),
                                  content: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      TextFormField(
                                        textCapitalization:
                                            TextCapitalization.characters,
                                        controller: _nameController,
                                        decoration: const InputDecoration(
                                          hintText: 'Nom de l\'étage',
                                        ),
                                      ),
                                      TextFormField(
                                        controller: _numberController,
                                        keyboardType: TextInputType.number,
                                        decoration: const InputDecoration(
                                          hintText: 'Nombre de place',
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
                                          // appel back-end create etage
                                          await EtageService.addEtage(
                                              name, number);
                                          fetchPlacesMethod().then((value) {
                                            Navigator.of(context).pop();
                                          });
                                        } else {
                                          // Afficher un message d'erreur
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(
                                            const SnackBar(
                                              content: Text(
                                                  'Veuillez saisir des données valide !'),
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
                          child: const Text('Ajouter un etage')))
                ],
              ),
            )
          : Row(
              children: [
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
                                    selected:
                                        selecteditem == index ? true : false,
                                    selectedColor: Colors.blue,
                                    leading: const Icon(Icons.local_parking),
                                    title: Text("Etage ${e.nom}"),
                                  ),
                                ),
                                IconButton(
                                  icon: const Icon(
                                    Icons.edit,
                                  ),
                                  onPressed: () {
                                    // Code à exécuter lorsque l'utilisateur appuie sur le bouton "Modifier"
                                    TextEditingController _numberController =
                                        TextEditingController();

                                    showDialog(
                                      context: context,
                                      builder: (BuildContext context) {
                                        return AlertDialog(
                                          title: const Text(
                                              'Modifier le nombre de place'),
                                          content: TextFormField(
                                            controller: _numberController,
                                            keyboardType: TextInputType.number,
                                            decoration: const InputDecoration(
                                              hintText: 'Nombre de place',
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
                                                int? number = int.tryParse(
                                                    _numberController.text);
                                                if (number != null) {
                                                  // appel back-end update de l'etage
                                                  await EtageService
                                                      .updateEtage(
                                                          e.id, number);
                                                  fetchPlacesMethod()
                                                      .then((value) {
                                                    Navigator.of(context).pop();
                                                  });
                                                } else {
                                                  // Afficher un message d'erreur
                                                  ScaffoldMessenger.of(context)
                                                      .showSnackBar(
                                                    const SnackBar(
                                                      content: Text(
                                                          'Veuillez saisir un nombre !'),
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
                                  icon: const Icon(
                                    Icons.delete,
                                  ),
                                  onPressed: () {
                                    // Code à exécuter lorsque l'utilisateur appuie sur le bouton "Supprimer"

                                    showDialog(
                                      context: context,
                                      builder: (BuildContext context) {
                                        return AlertDialog(
                                          title: const Text("SUPPRESION"),
                                          content: const Text(
                                              "Vous êtes sur le point de supprimer cet étage. \n Vous êtes sur?"),
                                          actions: <Widget>[
                                            TextButton(
                                              child: const Text('OUI'),
                                              onPressed: () async {
                                                if (etages.length <= 2) {
                                                  if (selectedflor == e.nom) {
                                                    if (selecteditem ==
                                                        etages.length) {
                                                      changeFlore(true);
                                                    } else {
                                                      changeFlore(false);
                                                    }
                                                  }
                                                } else {
                                                  if (selecteditem == 0) {
                                                    changeFlore(false);
                                                  } else {
                                                    if (selectedflor == e.nom ||
                                                        selecteditem > index) {
                                                      changeF(true);
                                                    } else {
                                                      changeF(false);
                                                    }
                                                  }
                                                }
                                                // appel back-end suppression de l'etage et de ces places
                                                await EtageService.deleteEtage(
                                                    e.nom);
                                                fetchPlacesMethod()
                                                    .then((value) {
                                                  Navigator.of(context).pop();
                                                });
                                              },
                                            ),
                                            TextButton(
                                                child: const Text('NON'),
                                                onPressed: () {
                                                  Navigator.of(context).pop();
                                                }),
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
                    Expanded(
                      child: SizedBox(
                        width: MediaQuery.of(context).size.width * 0.2,
                        child: InkWell(
                          onTap: () {
                            //aficher le modal
                            TextEditingController _numberController =
                                TextEditingController();
                            TextEditingController _nameController =
                                TextEditingController();

                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: const Text('Ajouter un nouvel etage'),
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
                                          hintText: 'Nombre de place',
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
                                          // appel back-end create etage
                                          await EtageService.addEtage(
                                              name, number);
                                          fetchPlacesMethod().then((value) {
                                            Navigator.of(context).pop();
                                          });
                                        } else {
                                          // Afficher un message d'erreur
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(
                                            const SnackBar(
                                              content: Text(
                                                  'Veuillez saisir des données valide !'),
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
                          child: const ListTile(
                            leading: Icon(Icons.add),
                            title: Text("Ajouter un étage"),
                          ),
                        ),
                      ),
                    )
                  ],
                ),
                Expanded(
                  child: GridView.builder(
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 7,
                    ),
                    itemCount: etages[selecteditem].places.length,
                    itemBuilder: (context, index) {
                      final e = etages[selecteditem].nom;
                      final p = etages[selecteditem].places[index];
                      return InkWell(
                        onTap: () {
                          setState(() {
                            EtageService.updatePlace(p.id);
                            fetchPlacesMethod().then((value) => 'done');
                          });
                        },
                        child: Center(
                          child: Card(
                            color: p.etat == true ? Colors.green : Colors.red,
                            child: Center(
                                child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                const Expanded(
                                    child: Icon(
                                  Icons.time_to_leave,
                                  size: 60,
                                )),
                                Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: Text(
                                    '$e ${p.num}',
                                    style: const TextStyle(fontSize: 30),
                                  ),
                                )
                              ],
                            )),
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
