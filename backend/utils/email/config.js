const nodemailer = require("nodemailer");

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Vérification de la connexion au service d'emails
const verifyEmailConfig = async () => {
  try {
    const verification = await transporter.verify();
    return verification;
  } catch (error) {
    console.error(
      "Erreur de configuration du service d'emails:",
      error.message
    );
    return false;
  }
};

// Exécuter la vérification au chargement du module
verifyEmailConfig();

// Fonction pour envoyer un email de validation d'inscription
const sendValidationEmail = async (email, nom, token) => {
  const clientUrl = process.env.CLIENT_URL.split(",")[0];
  const validationUrl = `${clientUrl}/validation?token=${token}`;
  const logoUrl = `${clientUrl}/logo_mail.png`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Cineguide - Validation de votre inscription",
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Validation de votre compte CineGuide</title>
        <style>
          body {
            font-family: 'Helvetica', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333333;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .email-header {
            background-color: #111111;
            padding: 20px;
            text-align: center;
          }
          .email-header img {
            max-width: 150px;
            height: auto;
          }
          .email-body {
            padding: 30px;
            line-height: 1.6;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            border-top: 1px solid #eeeeee;
          }
          h1 {
            color: #E71CA5;
            font-size: 24px;
            margin-top: 0;
          }
          .button {
            display: inline-block;
            background-color: #E71CA5;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
            text-align: center;
          }
          .button:hover {
            background-color: #d0199a;
          }
          .expiration-notice {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff8e1;
            border-left: 4px solid #ffcc00;
            font-size: 14px;
          }
          .social-links {
            margin-top: 20px;
          }
          .social-link {
            display: inline-block;
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <img src="${logoUrl}" alt="CineGuide Logo" 
                 onerror="this.onerror=null; this.src=''; this.alt='CineGuide';" />
          </div>
          <div class="email-body">
            <h1>Bienvenue sur CineGuide !</h1>
            <p>Bonjour ${nom},</p>
            <p>Merci de vous être inscrit sur notre plateforme. Votre compte a été créé avec succès, mais il doit être validé avant que vous puissiez vous connecter.</p>
            <p>Pour finaliser votre inscription, il vous suffit de cliquer sur le bouton ci-dessous :</p>
            <div style="text-align: center;">
              <a href="${validationUrl}" class="button">Valider mon compte</a>
            </div>
            <div class="expiration-notice">
              <strong>Important :</strong> Ce lien est valable pendant 60 minutes. Après ce délai, vous devrez demander un nouveau lien de validation.
            </div>
            <p>Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.</p>
            <p>À bientôt sur CineGuide !</p>
            <p><strong>L'équipe CineGuide</strong></p>
          </div>
          <div class="email-footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            <p>&copy; ${new Date().getFullYear()} CineGuide. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de validation:",
      error.message
    );
    return { success: false, error: error.message };
  }
};

// Fonction pour envoyer un email de confirmation après validation
const sendConfirmationEmail = async (email, nom) => {
  const clientUrl = process.env.CLIENT_URL.split(",")[0];
  const loginUrl = `${clientUrl}/connexion`;
  const logoUrl = `${clientUrl}/logo_mail.png`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Cineguide - Votre compte est activé !",
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Votre compte CineGuide est activé !</title>
        <style>
          body {
            font-family: 'Helvetica', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333333;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .email-header {
            background-color: #111111;
            padding: 20px;
            text-align: center;
          }
          .email-header img {
            max-width: 150px;
            height: auto;
          }
          .email-body {
            padding: 30px;
            line-height: 1.6;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            border-top: 1px solid #eeeeee;
          }
          h1 {
            color: #E71CA5;
            font-size: 24px;
            margin-top: 0;
          }
          .button {
            display: inline-block;
            background-color: #E71CA5;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
            text-align: center;
          }
          .button:hover {
            background-color: #d0199a;
          }
          .success-message {
            margin-top: 20px;
            padding: 15px;
            background-color: #f0fff0;
            border-left: 4px solid #22c55e;
            font-size: 14px;
          }
          .features-list {
            margin: 20px 0;
            padding-left: 20px;
          }
          .features-list li {
            margin-bottom: 10px;
          }
          .social-links {
            margin-top: 20px;
          }
          .social-link {
            display: inline-block;
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <img src="${logoUrl}" alt="CineGuide Logo" 
                 onerror="this.onerror=null; this.src=''; this.alt='CineGuide';" />
          </div>
          <div class="email-body">
            <h1>Félicitations ${nom} !</h1>
            <p>Votre compte CineGuide a été validé avec succès !</p>
            <div class="success-message">
              <strong>Bonne nouvelle !</strong> Vous pouvez dès maintenant vous connecter et profiter de tous les services CineGuide.
            </div>
            <p>Avec votre compte CineGuide, vous pouvez :</p>
            <ul class="features-list">
              <li>Découvrir des films et séries sur toutes vos plateformes de streaming</li>
              <li>Personnaliser vos recommandations selon vos goûts</li>
              <li>Suivre vos séries préférées et être notifié des nouveaux épisodes</li>
              <li>Créer et partager vos listes de favoris</li>
            </ul>
            <div style="text-align: center;">
              <a href="${loginUrl}" class="button">Se connecter maintenant</a>
            </div>
            <p>Nous sommes ravis de vous compter parmi nos utilisateurs !</p>
            <p><strong>L'équipe CineGuide</strong></p>
          </div>
          <div class="email-footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            <p>&copy; ${new Date().getFullYear()} CineGuide. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de confirmation:",
      error.message
    );
    return { success: false, error: error.message };
  }
};

module.exports = {
  transporter,
  sendValidationEmail,
  sendConfirmationEmail,
  verifyEmailConfig,
};
