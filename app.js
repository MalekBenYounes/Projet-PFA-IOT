const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');

// Firebase Admin SDK setup
const admin = require("firebase-admin");

// Configure environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
// Vérifier si la connexion est réussie
if (process.env.FIREBASE_DATABASE_URL) {
  console.log("URL de la base de données Firebase chargée avec succès.");
} else {
  console.error("FIREBASE_DATABASE_URL n'est pas définie dans le fichier .env.");
}
//teste d'ecriture et de lecture dans le base de données
// const db = admin.database();

// Test de l'écriture
// db.ref('testConnection').set({
//   message: "Connection successful"
// })
// .then(() => {
//   console.log("Données écrites avec succès !");
// })
// .catch((error) => {
//   console.error("Erreur lors de l'écriture des données :", error);
// });

// Test de la lecture
// db.ref('testConnection').once('value')
//   .then((snapshot) => {
//     const data = snapshot.val();
//     console.log("Données lues :", data);
//   })
//   .catch((error) => {
//     console.error("Erreur lors de la lecture des données :", error);
//   });
// Path for serving PDF files
const pdfsPath = path.join(__dirname, 'pdfs');
app.use('/pdfs', express.static(pdfsPath));

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Import route handlers
const RoutePlaces = require("./router/place");
const RouteEtages = require("./router/etage");
const RouteUsers = require("./router/utilisateur");
const RoutePers = require("./router/permission");
const RouteGrps = require("./router/groupe");
const RouteHist = require("./router/history");
const RouterFile = require("./router/file");

// Set up routes
app.use("/api/places/", RoutePlaces);
app.use("/api/etages/", RouteEtages);
app.use("/api/users/", RouteUsers);
app.use("/api/pers/", RoutePers);
app.use("/api/grps/", RouteGrps);
app.use("/api/hist/", RouteHist);
app.use("/api/file/", RouterFile);

// Export the app module
module.exports = app;