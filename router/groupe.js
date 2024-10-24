const express = require("express");
const router = express.Router();
const GrpCtrl = require("../controllers/groupe");

router.post("/",GrpCtrl.createGroupe);
router.get("/",GrpCtrl.getAllGroupes);
router.delete("/delete/:nom", GrpCtrl.deleteById);
router.put("/update/:id",GrpCtrl.updateGrp);
module.exports = router; 