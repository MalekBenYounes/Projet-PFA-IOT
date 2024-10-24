const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const RoutePlaces = require("./router/place");
const RouteEtages = require("./router/etage");
const RouteUsers = require("./router/utilisateur");
const RoutePers = require("./router/permission");
const RouteGrps = require("./router/groupe");
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

app.use("/api/places/", RoutePlaces);

app.use("/api/etages/", RouteEtages);

app.use("/api/users/", RouteUsers);

app.use("/api/pers/", RoutePers);

app.use("/api/grps/", RouteGrps);

app.use("/api/hist/", Routehist);

app.use("/api/file/",RouterFile);

module.exports = app;
