const admin = require("firebase-admin");
const db = admin.firestore();

exports.getHistByPlace = async (req, res) => {
  const id_place = req.params.id_place;
  console.log(`Requête pour l'historique avec id_place: ${id_place}`); // Ajoutez un log ici
  try {
      const snapshot = await db.collection("History").where("id_place", "==", id_place).get();
      if (snapshot.empty) {
          console.log("Aucun document trouvé."); // Log si le snapshot est vide
          return res.status(404).json({ message: "Aucune historique trouvé pour cet emplacement." });
      }

      const hist = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(hist); // Log des données récupérées
      return res.status(200).json({ hist });
  } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
  }
};


exports.getHist = async (req, res) => {
  try {
      const snapshot = await db.collection("History").get();
      const hist = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(hist); // Affichez tous les historiques récupérés
      return res.status(200).json({ hist });
  } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
  }
};


exports.getHistByDate = async (req, res) => {
    const id_place = req.params.id_place;
    const dateD = req.params.date;
    const dates = dateD.split(',');

    const dateDebut = new Date(dates[0]);
    dateDebut.setHours(0, 0, 0, 0); // Définir l'heure à 00:00:00

    const dateFin = new Date(dates[1]);
    dateFin.setHours(23, 59, 59, 999); // Définir l'heure à 23:59:59.999

    try {
        const snapshot = await db.collection("History")
            .where("id_place", "==", id_place)
            .where("update_date", ">=", dateDebut)
            .where("update_date", "<=", dateFin)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "Aucune historique trouvé pour cet emplacement dans cette plage de dates." });
        }

        const hist = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json({ hist });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};
