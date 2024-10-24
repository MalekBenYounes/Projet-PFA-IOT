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
<<<<<<< HEAD
const Routehist =require("./router/history");
const RouterFile= require("./router/file");
const dotenv= require("dotenv");
const path = require('path');

const pdfsPath = path.join(__dirname, 'pdfs'); // Chemin vers le répertoire des fichiers PDF
app.use('/pdfs', express.static(pdfsPath));
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
   
    useUnifiedTopology: true,
   
  })
  .then(() => {
    console.log("bd connecter!");
  })
  .catch(() => {
    console.log("echec de connexion");
  });
app.use(cors());
app.use(bodyParser.json());
=======
const RouteHist = require("./router/history");
const RouterFile = require("./router/file");
>>>>>>> a35303d3df21e7ef05cc1d9a491015161cad5a10

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
