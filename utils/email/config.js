const nodemailer = require("nodemailer");

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Vérification de la connexion au service d'emails au démarrage
(async function verifyEmailConnection() {
  try {
    console.log("Vérification de la connexion au service d'emails...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL_PASSWORD:",
      process.env.EMAIL_PASSWORD ? "***[Défini]***" : "***[Non défini]***"
    );

    const result = await transporter.verify();
    console.log("Connexion au service d'emails vérifiée avec succès:", result);
  } catch (error) {
    console.error(
      "ERREUR: Impossible de se connecter au service d'emails:",
      error
    );
    console.error(
      "Vérifiez vos paramètres EMAIL_USER et EMAIL_PASSWORD dans le fichier .env"
    );
    console.error(
      "Pour Gmail, assurez-vous d'avoir activé 'Accès moins sécurisé' ou configuré un mot de passe d'application"
    );
  }
})();

// Fonction pour envoyer un email de validation d'inscription
const sendValidationEmail = async (email, nom, token) => {
  console.log("Envoi d'un email de validation à:", email);
  console.log("Token de validation:", token);

  const validationUrl = `${process.env.CLIENT_URL}/validation?token=${token}`;
  console.log("URL de validation:", validationUrl);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Cineguide - Validation de votre inscription",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
        <h2 style="color: #9c27b0;">Bienvenue sur Cineguide !</h2>
        <p>Bonjour ${nom},</p>
        <p>Merci de vous être inscrit sur notre plateforme. Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous :</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${validationUrl}" style="background-color: #9c27b0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Valider mon compte</a>
        </div>
        <p>Ce lien est valable pendant 60 minutes. Après ce délai, vous devrez vous réinscrire.</p>
        <p>Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.</p>
        <p>À bientôt sur Cineguide !</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e4e4e4; font-size: 12px; color: #888;">
          <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log("Tentative d'envoi d'email avec Nodemailer...");
    console.log(
      "Options:",
      JSON.stringify({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
      })
    );

    const info = await transporter.sendMail(mailOptions);
    console.log("Email de validation envoyé avec succès:");
    console.log("- messageId:", info.messageId);
    console.log("- response:", info.response);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("ERREUR critique lors de l'envoi de l'email de validation:");
    console.error("- Message:", error.message);
    console.error("- Nom:", error.name);
    console.error("- Stack:", error.stack);
    console.error("Vérifiez la configuration SMTP et les paramètres dans .env");

    return {
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code,
        command: error.command,
      },
    };
  }
};

// Fonction pour envoyer un email de confirmation après validation
const sendConfirmationEmail = async (email, nom) => {
  console.log("Envoi d'un email de confirmation à:", email);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Cineguide - Confirmation de votre inscription",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
        <h2 style="color: #9c27b0;">Bienvenue sur Cineguide !</h2>
        <p>Bonjour ${nom},</p>
        <p>Votre compte a été validé avec succès. Vous pouvez dès maintenant vous connecter à notre plateforme et profiter de tous les services Cineguide.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/connexion" style="background-color: #9c27b0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Se connecter</a>
        </div>
        <p>À bientôt sur Cineguide !</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e4e4e4; font-size: 12px; color: #888;">
          <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log("Tentative d'envoi d'email de confirmation...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email de confirmation envoyé avec succès:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("ERREUR lors de l'envoi de l'email de confirmation:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  transporter,
  sendValidationEmail,
  sendConfirmationEmail,
};
