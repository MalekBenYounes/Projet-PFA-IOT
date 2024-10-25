const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const socket = require("socket.io");
const Place = require("./models/place");
const admin = require("firebase-admin"); // Assurez-vous d'avoir initialisé Firebase Admin
const db = admin.firestore();
const io = socket(server, {
  cors: {
    origin: '*',
  }
})

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
    io.emit('update', place);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message); // Retourner une réponse d'erreur appropriée
  }
});

io.on('connection', (data) => {
  console.log('Someone connected! ', data.id);
  io.emit('updateplace', '');
});

server.listen(process.env.PORT, () => {
  console.log("Serveur en marche");
});

module.exports = io;