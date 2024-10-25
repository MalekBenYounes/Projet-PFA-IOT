// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

// Importer la configuration Firebase
const db = require("./firebaseConfig"); // Ajoutez cette ligne

// Configure environment variables

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
