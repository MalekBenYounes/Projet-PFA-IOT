const express = require("express");
const router = express.Router();
const PlCtrl = require("../controllers/place");
router.post("/",PlCtrl.create)
router.get("/:id", PlCtrl.getOnePlace);
router.get("/state/:id", PlCtrl.getstatePlace);
router.get("/", PlCtrl.getAllPlaces);
router.get("/emty/", PlCtrl.getPlaceCountEmty);
router.get("/occupied/", PlCtrl.getPlaceCountOcup);
router.put("/update/:id", PlCtrl.update);
router.delete("/delete/:owner",PlCtrl.delete);//suprimer les places d'un etage
router.delete("/deleteOne/:id",PlCtrl.deleteOnePlace); //suprimer une seule place avec son id 
module.exports = router;
