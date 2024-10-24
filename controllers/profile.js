const Utilisateur = require("../models/utilisateur");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  const user = await Utilisateur.findOne({ id: req.body.id });
  if (!user) {
    return res
      .status(400)
      .json({ message: "identifiant ou mot de passe incorrecte" });
  }

  const isPasswordMatch = await bycrypt.compare(
    req.body.mot_pass,
    user.mot_pass
  );

  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: "identifiant ou mot de passe incorrecte" });
  }

  const token = jwt.sign(
    { _id: user._id, groupe: user.groupe },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "5d",
    }
  );

  res.status(200).json({ user: user, token: token });
};
exports.updateProfil = async (req, res) => {
  const token = req.params.token;

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await Utilisateur.findById({ _id: decode._id });

  const isPasswordMatch = await bycrypt.compare(req.body.pass, user.mot_pass);

  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: " Mot de passe incorrecte" });
  }
  if (req.body.user.mot_pass != user.mot_pass) {
    const salt = await bycrypt.genSalt(10);
    req.body.user.mot_pass = await bycrypt.hash(req.body.user.mot_pass, salt);
  }
  await Utilisateur.updateOne(
    { _id: decode._id },
    {
      mot_pass: req.body.user.mot_pass,
      nom: req.body.user.nom,
      prenom: req.body.user.prenom,
      email: req.body.user.email,
    }
  );
  res.status(200).json({ message: "mise a jour avec succes !" });
};
exports.getprofil = async (req, res) => {
  const token = req.params.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await Utilisateur.findById(decode._id);
  res.json(user);
};

exports.resetpassword = async (req, res) => {
  const email = req.params.email;
  const result = await Utilisateur.findOne({ email: email });
  if (result) {
    newpassword = generateRandomString(8);
    const tranporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });
    const mailOption = {
      from: process.env.MAIL,
      to: email,
      subject: "Réinitialiser Mot de Passe",
      html: `<head>
         <style type="text/css">
         body {
           margin: 0;
           padding: 0;
           -webkit-text-size-adjust: 100%;
           -ms-text-size-adjust: 100%;
         }
     
         table,
         td {
           border-collapse: collapse;
           
         }
     
        
     
       </style>
     
       </head>
      
     
     
     <body>
       <div style="display:none;font-size:1px;;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> Preview - Notification from Coded Mails </div>
       <div >
       
         <div style="margin:0px auto;max-width:600px;">
           <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
             <tbody>
               <tr>
                 <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                 
                
                  
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
        
         <div style="background:#54595f;background-color:#54595f;margin:0px auto;border-radius:4px 4px 0 0;max-width:600px;">
           <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#54595f;background-color:#54595f;width:100%;border-radius:4px 4px 0 0;">
             <tbody>
               <tr>
                 <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              
                   <div style="margin:0px auto;max-width:600px;">
                     <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                       <tbody>
                         <tr>
                           <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              
                             <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                 <tbody>
                                 <tr>
                                   <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                     <div style="font-family:Roboto, Helvetica, Arial, sans-serif;font-size:24px;font-weight:400;line-height:30px;text-align:center;color:#ffffff;">
                                       <h1 style="margin: 0; font-size: 24px; line-height: normal; font-weight: 400;">Réinitialisez votre mot de passe</h1>
                                     </div>
                                   </td>
                                 </tr>
                                 <tr>
                                   <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                     <div style="font-family:Roboto, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:20px;text-align:left;color:#ffffff;">
                                       <p style="margin: 0; display: block;
                                       margin: 13px 0;">Salut, ${result.prenom}, Il semble que vous ayez oublié votre mot de passe. Voici votre nouveau mot de passe : ${newpassword}  </p>
                                     </div>
                                   </td>
                                 </tr>
                                 
                                     </tbody></table>
                                   </td>
                                 </tr>
                               </tbody></table>
                             </div>
                       
                  
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
     
            
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
         
         
         
        
       </div>
     
     
     </body>`,
    };
    const salt = await bycrypt.genSalt(10);
    newpass = await bycrypt.hash(newpassword, salt);
    await Utilisateur.updateOne(
      { _id: result._id },
      {
        mot_pass: newpass,
      }
    );
    res.json("mise a jour avec succes !");
    tranporter.sendMail(mailOption, function (error, succes) {
      if (error) {
        console.log(error);
      } else {
        console.log("email envoyer", succes.response);
      }
    });
  }
};

exports.deleteProfil = async (req, res) => {
  const token = req.params.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await Utilisateur.findById(decode._id);

  const isPasswordMatch = await bycrypt.compare(req.params.pass, user.mot_pass);

  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: "mot de passe incorrecte" });
  }
  const result = await Utilisateur.deleteOne({ _id: decode._id });
  res.status(200).json(result);
};

//Gener un mot de passe aleatoire
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
