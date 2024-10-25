// firebaseConfig.js
const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Configure environment variables
dotenv.config();
// Vérifier si la connexion est réussie
if (process.env.FIREBASE_DATABASE_URL) {
    console.log("URL de la base de données Firebase chargée avec succès.");
} else {
    console.error("FIREBASE_DATABASE_URL n'est pas définie dans le fichier .env.");
}
// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});
// const db = admin.database();

// db.ref('testConnection').set({
//   message: "Connection successful"
// })
// .then(() => {
//   console.log("Données écrites avec succès !");
// })
// .catch((error) => {
//   console.error("Erreur lors de l'écriture des données :", error);
// });

// db.ref('testConnection').once('value')
//   .then((snapshot) => {
//     const data = snapshot.val();
//     console.log("Données lues :", data);
//   })
//   .catch((error) => {
//     console.error("Erreur lors de la lecture des données :", error);
//   });
// Exporter l'objet Firestore
const db = admin.firestore();
module.exports = db;
