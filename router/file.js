const express = require("express");
const router = express.Router();
const FileCtrl = require("../controllers/file");

router.post('/',FileCtrl.createFile);
router.get('/',FileCtrl.getAllFiles);
router.delete('/delete/:id',FileCtrl.deleteFile);

module.exports = router;