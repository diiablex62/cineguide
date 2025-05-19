const nodemailer = require("nodemailer");
require("dotenv").config();

// Création du transporteur avec la bonne configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Utilisation du service Gmail explicitement
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Sécurité réduite pour le développement local uniquement
  },
});

// Vérifiez la connexion au serveur SMTP
transporter.verify(function (error, success) {
  if (error) {
    console.error("Erreur de connexion SMTP:", error);
  } else {
    console.log("Serveur SMTP prêt à envoyer des emails");
  }
});

// Fonction pour envoyer un email de réinitialisation de mot de passe
const sendPasswordResetEmail = async (to, token) => {
  try {
    // S'assurer que l'URL ne contient pas de virgules
    const clientUrl = process.env.CLIENT_URL.split(",")[0];
    const resetUrl = `${clientUrl}/reset-password/${token}`;

    const mailOptions = {
      from: `"CineGuide" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Réinitialisation de votre mot de passe CineGuide",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Réinitialisation de votre mot de passe</h2>
          <p>Vous avez demandé la réinitialisation de votre mot de passe sur CineGuide.</p>
          <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
          <p style="margin: 20px 0;">
            <a href="${resetUrl}" style="background-color: #4a90e2; color: white; padding: 10px 15px; text-decoration: none; border-radius: 3px; display: inline-block;">
              Réinitialiser mon mot de passe
            </a>
          </p>
          <p>Ce lien expire dans 1 heure.</p>
          <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
          <p>Cordialement,<br>L'équipe CineGuide</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
};

// Autres fonctions d'envoi d'email...

module.exports = {
  sendPasswordResetEmail,
  // Exportez ici vos autres fonctions d'envoi d'email
};
