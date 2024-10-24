const pdfkit = require("pdfkit");
const fs = require("fs");
const pdfdocument = new pdfkit();
const File = require("../models/file");

exports.createFile = async (req, res) => {
  pdfdocument.pipe(
    fs.createWriteStream(
      `C:/Users/Malek/Desktop/PFE/app/mon-app/src/assets/pdfs/${req.body.nom}.pdf`
    )
  );

  pdfdocument.font("Helvetica").fontSize(12);

 
    pdfdocument.image("./image/preeparkDash.png", {
      fit: [100, 100],
      align: 'right',
      valign: 'top',
    });
   

  pdfdocument.text("Titre du document", { align: "center" });
  pdfdocument.text("titre 1");
  pdfdocument.text("Paragraphe 1");
  pdfdocument.text("titre 2");
  pdfdocument.text("Paragraphe 2");




  pdfdocument.end();

  const cheminPDF = `../../../assets/pdfs/${req.body.nom}.pdf`;

  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes

  const localDate = new Date(now.getTime() - offset);

  const file = new File({
    nom: req.body.nom,
    path: cheminPDF,
    date: localDate,
  });
  await file
    .save()
    .then((file) => {
      return res.status(201).json({ file });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.getAllFiles = async (req, res) => {
  let foundFile = await File.find();
  res.json(foundFile);
};
exports.deleteFile = async (req, res) => {
  const id = req.params.id;
  const result = await File.deleteOne({ _id: id });
  res.status(200).json(result);
};
