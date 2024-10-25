const db = require("../firebaseConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  try {
      const snapshot = await db.collection("Utilisateurs").where("email", "==", req.body.email).get();
      if (snapshot.empty) {
          return res.status(400).json({ message: "Identifiant ou mot de passe incorrect" });
      }

      const user = snapshot.docs[0].data();
      const isPasswordMatch = await bcrypt.compare(req.body.mot_pass, user.mot_pass);

      if (!isPasswordMatch) {
          return res.status(400).json({ message: "Identifiant ou mot de passe incorrect" });
      }

      const token = jwt.sign(
          { id: user.id, groupe: user.groupe },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
      );

      res.status(200).json({ user, token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};


exports.updateProfil = async (req, res) => {
    const token = req.params.token;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userRef = db.collection("Utilisateurs").doc(decode.id);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const user = userSnapshot.data();
        const isPasswordMatch = await bcrypt.compare(req.body.pass, user.mot_pass);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        if (req.body.user.mot_pass !== user.mot_pass) {
            const salt = await bcrypt.genSalt(10);
            req.body.user.mot_pass = await bcrypt.hash(req.body.user.mot_pass, salt);
        }

        await userRef.update({
            mot_pass: req.body.user.mot_pass,
            nom: req.body.user.nom,
            prenom: req.body.user.prenom,
            email: req.body.user.email,
        });

        res.status(200).json({ message: "Mise à jour réussie" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getProfil = async (req, res) => {
  const token = req.params.token;

  try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userSnapshot = await db.collection("Utilisateurs").doc(decode.id).get();

      if (!userSnapshot.exists) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.json(userSnapshot.data());
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const email = req.params.email;

  try {
      const snapshot = await db.collection("Utilisateurs").where("email", "==", email).get();
      if (snapshot.empty) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const user = snapshot.docs[0];
      const newPassword = generateRandomString(8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.MAIL,
              pass: process.env.PASS,
          },
      });

      const mailOptions = {
          from: process.env.MAIL,
          to: email,
          subject: "Réinitialisation du mot de passe",
          html: `<p>Bonjour, ${user.data().prenom},</p>
                 <p>Voici votre nouveau mot de passe : <b>${newPassword}</b></p>`,
      };

      await db.collection("Utilisateurs").doc(user.id).update({ mot_pass: hashedPassword });
      transporter.sendMail(mailOptions, (error, success) => {
          if (error) {
              console.error(error);
          } else {
              console.log("Email envoyé : ", success.response);
          }
      });

      res.status(200).json("Mise à jour réussie !");
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

exports.deleteProfil = async (req, res) => {
    const token = req.params.token;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userRef = db.collection("Utilisateurs").doc(decode.id);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const user = userSnapshot.data();
        const isPasswordMatch = await bcrypt.compare(req.params.pass, user.mot_pass);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        await userRef.delete();
        res.status(200).json({ message: "Profil supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Génère un mot de passe aléatoire
function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}
