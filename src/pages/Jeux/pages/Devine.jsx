import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { IoSend } from "react-icons/io5";

export default function Devine() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState("");

  // Fonction pour obtenir une nouvelle description via l'API
  const getNewDescription = async () => {
    setLoading(true);
    setFeedback("");
    setUserGuess("");
    setShowHint(false);

    try {
      // Simulation d'appel à l'API backend qui utiliserait Mistral AI
      // Dans une application réelle, ceci serait un appel fetch() à votre API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Descriptions prédéfinies pour la démonstration
      const predefinedDescriptions = [
        {
          description:
            "Un archéologue barbu avec phobie des serpents court après des reliques en esquivant des pièges mortels.",
          answer: "Indiana Jones",
          hint: "Il porte toujours un chapeau et un fouet.",
        },
        {
          description:
            "Des humains minuscules visitent l'espace pour trouver que leur intelligence artificielle préférée n'est pas très amicale.",
          answer: "2001: l'Odyssée de l'espace",
          hint: "HAL 9000 peut lire sur vos lèvres.",
        },
        {
          description:
            "Un jeune fermier découvre qu'il a des talents cachés après avoir rencontré un vieil ermite et rejoint une rébellion galactique.",
          answer: "Star Wars",
          hint: "La force est puissante dans cette famille.",
        },
        {
          description:
            "Un homme souffrant d'amnésie se découvre des compétences surprenantes en arts martiaux et langues étrangères.",
          answer: "Jason Bourne",
          hint: "C'est un agent qui a perdu sa mémoire mais pas ses réflexes.",
        },
        {
          description:
            "Une femme de ménage dans un laboratoire secret tombe amoureuse d'une créature aquatique captive.",
          answer: "La Forme de l'eau",
          hint: "Film de Guillermo del Toro qui a remporté l'Oscar du meilleur film.",
        },
      ];

      const randomIndex = Math.floor(
        Math.random() * predefinedDescriptions.length
      );
      const selectedItem = predefinedDescriptions[randomIndex];

      setDescription(selectedItem.description);
      setAnswer(selectedItem.answer);
      setHint(selectedItem.hint);
    } catch (error) {
      console.error("Erreur lors de la récupération d'une description:", error);
      setFeedback("Erreur de connexion au serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Charger une description au démarrage
  useEffect(() => {
    getNewDescription();
  }, []);

  // Vérifier la réponse du joueur
  const checkAnswer = () => {
    if (!userGuess.trim()) {
      setFeedback("Veuillez entrer une réponse.");
      return;
    }

    // Vérification simple (pourrait être améliorée pour être plus tolérante)
    const isCorrect =
      userGuess.toLowerCase().includes(answer.toLowerCase()) ||
      answer.toLowerCase().includes(userGuess.toLowerCase());

    if (isCorrect) {
      setFeedback(`Bravo! La réponse était bien "${answer}". 🎉`);
    } else {
      setFeedback(`Pas tout à fait... Essayez encore ou demandez un indice.`);
    }
  };

  // Révéler la réponse
  const revealAnswer = () => {
    setFeedback(`La réponse était "${answer}". 🎬`);
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/8">
        <Navbar></Navbar>
      </div>
      <div className="w-full lg:w-6/8">
        <div className="min-h-screen    flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md  rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text ">
                Devine le Film/Série
              </h1>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold ">Description</h2>
                  <button
                    onClick={getNewDescription}
                    disabled={loading}
                    className="flex items-center gap-1  px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Chargement..." : "Nouvelle"}
                  </button>
                </div>

                <div className="rounded-lg p-4 min-h-24 flex items-center justify-center">
                  {loading ? (
                    <div className="text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid  border-r-transparent"></div>
                      <p className="mt-2 ">L'IA réfléchit...</p>
                    </div>
                  ) : (
                    <p className="text-lg italic">{description}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    placeholder="Votre réponse..."
                    className="flex-1 border  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 "
                    disabled={loading}
                  />
                  <button
                    onClick={checkAnswer}
                    disabled={loading}
                    className="bg-fuchsia hover:bg-fuchsia-hover px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <IoSend size={18} />
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm bg-gray-fonce hover:bg-gray-clair text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                    disabled={loading}
                  >
                    {showHint ? "Cacher l'indice" : "Indice"}
                  </button>

                  <button
                    onClick={revealAnswer}
                    className="text-sm bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    Révéler la réponse
                  </button>
                </div>

                {showHint && hint && (
                  <div className="mt-3 p-2  text-sm">
                    <p>
                      <strong>Indice:</strong> {hint}
                    </p>
                  </div>
                )}

                {feedback && (
                  <div
                    className={`mt-4 p-3 rounded-lg ${
                      feedback.includes("Bravo")
                        ? "bg-green-900 text-green-200"
                        : "bg-blue-900 text-blue-200"
                    }`}
                  >
                    <p>{feedback}</p>
                  </div>
                )}
              </div>

              <div className="border-t  pt-4 text-center text-sm ">
                <p>Propulsé par Mistral AI</p>
                <div className="flex justify-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                    Utile
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                    À améliorer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
