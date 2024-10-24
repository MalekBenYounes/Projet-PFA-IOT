const express = require("express");
const router = express.Router();
const PerCtrl = require("../controllers/permission");

// router.post("/",PerCtrl.createPer);

router.get("/",PerCtrl.getAllPer);

module.exports = router; 