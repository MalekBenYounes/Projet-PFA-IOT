const express = require("express");
const router = express.Router();
const PlCtrl = require("../controllers/place");

router.get("/:id", PlCtrl.getOnePlace);
router.get("/", PlCtrl.getAllPlaces);
// router.put("/update/:id", PlCtrl.update);
router.delete("/delete/:owner",PlCtrl.delete);//suprimer les places d'un etage
router.delete("/deleteOne/:id",PlCtrl.deleteOnePlace); //suprimer une seule place avec son id 
module.exports = router;
