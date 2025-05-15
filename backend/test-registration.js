// Script de test pour l'API d'inscription
const fetch = require("node-fetch");

// Fonction pour tester l'inscription
async function testRegistration() {
  console.log("=== Test d'inscription ===");

  // Génère un email unique pour le test
  const randomEmail = `test${Date.now()}@test.com`;

  const userData = {
    nom: "Test",
    prenom: "Utilisateur",
    email: randomEmail,
    password: "Test123!",
  };

  console.log("Données d'inscription:", userData);

  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Statut de la réponse:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log("Corps de la réponse:", JSON.stringify(data, null, 2));

    // Vérifie si la réponse contient uniquement un message et un email
    const hasOnlyMessageAndEmail =
      data.message && data.email && Object.keys(data).length === 2;
    console.log(
      "La réponse contient-elle uniquement un message et un email?",
      hasOnlyMessageAndEmail
    );

    if (data.token || data.user) {
      console.log("ERREUR: La réponse contient un token ou un utilisateur!");
    }
  } catch (error) {
    console.error("Erreur lors du test:", error);
  }
}

// Exécution du test
testRegistration();
