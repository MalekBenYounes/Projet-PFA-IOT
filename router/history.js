const express = require("express");
const router = express.Router();
const HistCrtl = require("../controllers/history");

router.get("/:id_place/:date", HistCrtl.getHistByDate); // Mettez cette ligne en premier
router.get("/:id_place", HistCrtl.getHistByPlace);
router.get("/", HistCrtl.getHist);


module.exports = router;