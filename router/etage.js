const express = require("express");
const router = express.Router();
const EtCtrl = require("../controllers/etage");

router.post("/", EtCtrl.createEtage);
router.get("/", EtCtrl.getAllEtages);

router.get("/:nom", EtCtrl.getOneEtage);
router.delete("/delete/:nom", EtCtrl.deleteById);
router.put("/update/", EtCtrl.update);


module.exports = router;
