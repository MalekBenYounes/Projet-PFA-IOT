const express = require("express");
const router = express.Router();
const HistCrtl = require("../controllers/history");

router.get("/:id_place",HistCrtl.gethistbyplace);
router.get("/",HistCrtl.gethist);
router.get("/:id_place/:date",HistCrtl.gethistbydate);

module.exports = router;