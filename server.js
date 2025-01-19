const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const socket = require("socket.io");
const Place = require("./models/place");
const admin = require("firebase-admin"); // Assurez-vous d'avoir initialisé Firebase Admin
const axios = require("axios"); // Pour les appels à l'API interne

// Initialisation Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("./path/to/serviceAccountKey.json")),
    databaseURL: "https://<your-database-name>.firebaseio.com" // Remplace par l'URL de ta base de données
  });
}

const db = admin.firestore();
const rtdb = admin.database(); // Connexion à Realtime Database
const io = socket(server, {
  cors: {
    origin: "*",
  }
});

app.use("/api/places/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findById(id); // Assurez-vous que cela fonctionne avec votre setup

    // Inverser l'état de la place
    place.etat = !place.etat;

    // Créer un nouvel historique pour la place
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
    const localDate = new Date(now.getTime() - offset);

    // Créer un nouvel historique dans Firestore
    const newHist = {
      id_place: place._id.toString(), // Convertir l'ID en chaîne si nécessaire
      update_date: localDate,
      last_state: place.etat,
    };

    // Enregistrer les modifications de la place et l'historique dans Firestore
    await place.save();
    await db.collection("Hist").add(newHist); // Ajoutez l'historique à Firestore

    res.send("Mise à jour avec succès !");
    io.emit("update", place);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message); // Retourner une réponse d'erreur appropriée
  }
});

// Écoute des connexions Socket.io
io.on("connection", (data) => {
  console.log("Someone connected! ", data.id);
  io.emit("updateplace", "");
});

// Connexion à Firebase Realtime Database et mise en écoute
const parkingRef = rtdb.ref("parking"); // Chemin dans Realtime Database

parkingRef.on("value", (snapshot) => {
  const data = snapshot.val();
  console.log("Données détectées dans Realtime Database :", data);

  // Vérifie si les données sont valides avant d'appeler l'API
  if (data && data.available_spots && data.sensor1 && data.sensor2 && data.sensor3) {
    // Appel de l'API interne
    callInternalAPI(data);
  } else {
    console.error("Données invalides reçues :", data);
  }
});

// Fonction pour appeler une API interne
async function callInternalAPI(data) {
  console.log('wselt lel api');
  try {
    // Extraction de l'état du capteur 1 souhaité
    const sensor1Status = data.sensor1 === 'true'; // Convertir en booléen
    console.log('Etat du capteur 1 souhaité :', sensor1Status);
  
    // Appel GET pour récupérer l'état actuel du capteur 1
    const currentStateResponse = await axios.get("http://localhost:3000/api/places/state/VLEt1Jy79hYzUezClAj4");
    const currentState = currentStateResponse.data.state; // Récupère l'état actuel du capteur
  
    // Comparaison des états actuels avec les états souhaités
    if (currentState !== sensor1Status) {
      // Si l'état actuel diffère de l'état souhaité, on effectue l'appel PUT pour mettre à jour
      const response = await axios.put("http://localhost:3000/api/places/update/VLEt1Jy79hYzUezClAj4", { sensor1: sensor1Status });
      console.log('Sensor 1 updated');
      console.log("Réponse de l'API interne :", response.data);
    } else {
      // Si l'état est déjà à jour, on ne fait rien
      console.log('L\'état du capteur 1 est déjà à jour. Aucun changement nécessaire.');
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API interne :", error.message);
  }
  
 /********************************************************** */
  try {
    // Extraction de l'état du capteur 2 souhaité 
    const sensor2Status = data.sensor2 === 'true'; // Convertir en booléen 
    console.log('Etat du capteur 2 souhaité :', sensor2Status); 
  
    // Appel GET pour récupérer l'état actuel du capteur 2
    const currentStateResponse = await axios.get("http://localhost:3000/api/places/state/SqVIXSZg669IyBwCD7No");
    const currentState = currentStateResponse.data.state; // Récupère l'état actuel du capteur
  
    // Comparaison des états actuels avec les états souhaités
    if (currentState !== sensor2Status) { 
      // Si l'état actuel diffère de l'état souhaité, on effectue l'appel PUT pour mettre à jour
      const response = await axios.put("http://localhost:3000/api/places/update/SqVIXSZg669IyBwCD7No", { sensor2: sensor2Status });
      console.log('Sensor 2 updated'); 
      console.log("Réponse de l'API interne :", response.data);
    } else {
      // Si l'état est déjà à jour, on ne fait rien
      console.log('L\'état du capteur 2 est déjà à jour. Aucun changement nécessaire.');
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API interne :", error.message);
  }
  
  /********************************************************** */

  try {
    // Extraction de l'état du capteur 3 souhaité  
    const sensor3Status = data.sensor3 === 'true'; // Convertir en booléen  
    console.log('Etat du capteur 3 souhaité :', sensor3Status);  
  
    // Appel GET pour récupérer l'état actuel du capteur 3 
    const currentStateResponse = await axios.get("http://localhost:3000/api/places/state/xJhrZ9Q44coABIRgjcWh");
    const currentState = currentStateResponse.data.state; // Récupère l'état actuel du capteur
  
    // Comparaison des états actuels avec les états souhaités
    if (currentState !== sensor3Status) {  
      // Si l'état actuel diffère de l'état souhaité, on effectue l'appel PUT pour mettre à jour
      const response = await axios.put("http://localhost:3000/api/places/update/xJhrZ9Q44coABIRgjcWh", { sensor3: sensor3Status }); 
      console.log('Sensor 3 updated');  
      console.log("Réponse de l'API interne :", response.data);
    } else {
      // Si l'état est déjà à jour, on ne fait rien
      console.log('L\'état du capteur 3 est déjà à jour. Aucun changement nécessaire.'); 
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API interne :", error.message);
  }
  

  
}

// Lancement du serveur
server.listen(process.env.PORT, () => {
  console.log("Serveur en marche");
});

module.exports = io;
