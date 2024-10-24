const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const socket= require("socket.io");
const Place = require("./models/place");
const Hist = require("./models/history");
const io = socket(server, {
  cors: {
      origin: '*',
  }
})


app.use("/api/places/update/:id",async (req, res) =>  {
  
  try {
    const id = req.params.id;
    const place = await Place.findById(id);
    place.etat = !place.etat;
    // Créer un nouvel historique pour la place
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
    
    
    const localDate = new Date(now.getTime() - offset);
    const newHist = new Hist({
      id_place: place._id,
      update_date: localDate,
      last_state: place.etat,
    });
    await place.save();
    await newHist.save();
    res.send("mise a jour avec succes !");
    io.emit('update', place)
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

io.on('connection', (data) => {
  console.log('someone connected! ',data.id);
  io.emit('updateplace','')
});


server.listen(process.env.PORT, () => {
  console.log("serveur en marche");
});
module.exports = io;