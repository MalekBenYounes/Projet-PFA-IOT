const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/utilisateur");
const profilCtrl =require("../controllers/profile")

router.post("/", UserCtrl.createUser);
router.get("/", UserCtrl.getAllUser);
router.delete("/delete/:id", UserCtrl.deleteById);
router.put("/update/:id", UserCtrl.updateGroupe);
router.post("/login/", profilCtrl.login);
router.get("/profil/:token", profilCtrl.getProfil); 
router.put("/resetpass/:email", profilCtrl.resetPassword);
router.put("/updateprofil/:token",profilCtrl.updateProfil);
router.delete("/deleteprofil/:token/:pass", profilCtrl.deleteProfil);
module.exports = router;
