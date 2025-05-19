import React, { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as authAPI from "../../apis/auth.api";
import { setCookie, getCookie, removeCookie } from "../../utils/cookies";

export default function AuthProvider({ children }) {
  const defaultUser = {
    email: "",
    firstname: "",
    lastname: "",
    avatar: "",
    textPerso: "",
    adress: "",
    city: "",
    postalCode: "",
    complement: "",
  };

  // État pour suivre si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // État pour stocker les données de l'utilisateur
  const [user, setUser] = useState(defaultUser);

  // État pour suivre si l'utilisateur est connecté (autre nom pour la compatibilité)
  const [connectedUser, setConnectedUser] = useState(false);

  // État pour stocker le token d'authentification
  const [token, setToken] = useState(null);

  // État pour stocker l'ID de l'utilisateur
  const [userId, setUserId] = useState(null);

  // État pour gérer le chargement initial
  const [isLoading, setIsLoading] = useState(true);

  // État pour stocker les données de l'utilisateur
  const [abonnement, setAbonnement] = useState();

  // État pour stocker les messages d'erreur
  const [error, setError] = useState(null);

  // État pour stocker les messages de confirmation
  const [notification, setNotification] = useState(null);

  // État pour suivre si un compte est en attente de validation
  const [pendingAccount, setPendingAccount] = useState(null);

  const [fakeUser] = useState({
    email: "default@example.com",
  });

  // Effet pour charger les données de session au chargement de l'application
  useEffect(() => {
    const verifyAuthentication = async () => {
      setIsLoading(true);

      try {
        // Récupération des données depuis les cookies
        const savedToken = getCookie("token");
        const savedUserId = getCookie("userId");
        const savedUserData = getCookie("userData");

        if (savedToken && savedUserId) {
          // Vérifier que le token est toujours valide
          const { isValid, userData } = await authAPI.verifyToken(savedToken);

          if (isValid) {
            setToken(savedToken);
            setUserId(savedUserId);
            setIsLoggedIn(true);
            setConnectedUser(true);

            // Utiliser les données actualisées ou celles des cookies
            if (savedUserData) {
              try {
                const parsedUserData = JSON.parse(savedUserData);
                setUser({
                  ...defaultUser,
                  ...parsedUserData,
                });
              } catch (error) {
                console.error(
                  "Erreur lors du parsing des données utilisateur:",
                  error
                );
              }
            }
          } else {
            logout();
          }
        } else {
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthentication();
  }, []);

  // Fonction de connexion avec appel API
  const login = async (credentials) => {
    try {
      setError(null);
      const data = await authAPI.login(credentials);

      // Sauvegarder dans le state
      setToken(data.token);
      setUserId(data.userId);
      setIsLoggedIn(true);
      setConnectedUser(true);

      // Mettre à jour les données utilisateur
      const userData = {
        id: data.userId,
        email: data.email || credentials.email,
        firstname: data.prenom || "",
        lastname: data.nom || "",
      };

      setUser({
        ...defaultUser,
        ...userData,
      });

      // Persister dans les cookies
      setCookie("token", data.token);
      setCookie("userId", data.userId);
      setCookie("userData", JSON.stringify(userData));

      return data;
    } catch (error) {
      console.error("Échec de connexion:", error);

      // Gérer le cas où le compte est en attente de validation
      if (error.status === 403 && error.data?.isPending) {
        setPendingAccount(credentials.email);
        setError(
          "Votre compte est en attente de validation. Veuillez vérifier votre email."
        );
      }
      // Gérer les erreurs réseau
      else if (
        error.message &&
        error.message.includes("Impossible de contacter le serveur")
      ) {
        setError(error.message);
      }
      // Pour toute autre erreur d'authentification, utiliser un message générique
      else if (error.status === 400 || error.status === 401) {
        setError("L'email ou le mot de passe est incorrect");
      }
      // Message par défaut pour les autres types d'erreurs
      else {
        setError("Une erreur est survenue lors de la connexion");
      }

      throw error;
    }
  };

  // Function to get user subscription information
  const getUserSubscription = async (userId) => {
    try {
      const data = await authAPI.getUserAbonnement(userId);

      if (data) {
        setAbonnement(data);
        return data;
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
      setError(error.message || "Error retrieving subscription information");
      throw error;
    }
  };

  // Fonction d'inscription avec appel API
  const registerUser = async (userData) => {
    try {
      setError(null);

      // Adapter le format des données si nécessaire
      const formattedData = {
        nom: userData.nom || userData.lastname,
        prenom: userData.prenom || userData.firstname,
        email: userData.email,
        password: userData.password,
      };

      const data = await authAPI.register(formattedData);

      // L'utilisateur temporaire est créé et un email de validation est envoyé
      if (data && data.message && data.email) {
        setPendingAccount(data.email);
        setNotification(data.message);
        return { success: true, isPending: true, email: data.email };
      }

      return data;
    } catch (error) {
      console.error("Échec d'inscription:", error);
      setError(error.message || "Erreur lors de l'inscription");
      throw error;
    }
  };

  // Fonction pour valider un compte utilisateur
  const validateAccount = async (token) => {
    try {
      // Réinitialiser les états d'erreur et de notification
      setError(null);

      // Empêcher l'affichage simultané de notifications contradictoires
      setNotification(null);

      const data = await authAPI.validateAccount(token);

      if (data && data.token && data.user) {
        // Sauvegarder dans le state
        setToken(data.token);
        setUserId(data.user._id);
        setIsLoggedIn(true);
        setConnectedUser(true);
        setPendingAccount(null);

        // Préparer les données utilisateur
        const userInfo = {
          email: data.user.email,
          firstname: data.user.prenom,
          lastname: data.user.nom,
        };

        // Mettre à jour les données utilisateur
        setUser({
          ...defaultUser,
          ...userInfo,
        });

        // Persister dans les cookies
        setCookie("token", data.token);
        setCookie("userId", data.user._id);
        setCookie("userData", JSON.stringify(userInfo));

        // Définir la notification de succès
        setNotification(
          data.message || "Votre compte a été validé avec succès!"
        );

        return data;
      } else {
        // Si la réponse ne contient pas les données attendues mais n'a pas généré d'erreur
        console.error("Données de validation incomplètes:", data);
        throw new Error("Données de validation incomplètes");
      }
    } catch (error) {
      // S'assurer qu'aucune donnée d'authentification n'est présente en cas d'erreur
      setToken(null);
      setUserId(null);
      setIsLoggedIn(false);
      setConnectedUser(false);
      setError(error.message || "Erreur lors de la validation du compte");
      // S'assurer qu'aucune notification de succès n'est présente
      setNotification(null);
      throw error;
    }
  };

  // Fonction pour renvoyer l'email de validation
  const resendValidationEmail = async (email) => {
    try {
      setError(null);

      const data = await authAPI.resendValidationEmail(email || pendingAccount);

      if (data && data.message) {
        setNotification(data.message);
      }

      return data;
    } catch (error) {
      console.error("Échec du renvoi d'email de validation:", error);
      setError(
        error.message || "Erreur lors du renvoi de l'email de validation"
      );
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    // Supprimer du state
    setToken(null);
    setUserId(null);
    setUser(defaultUser);
    setIsLoggedIn(false);
    setConnectedUser(false);
    setPendingAccount(null);
    setError(null);
    setNotification(null);

    // Supprimer des cookies
    removeCookie("token");
    removeCookie("userId");
    removeCookie("userData");
  };

  // Fonction pour effacer les messages d'erreur
  const clearError = () => {
    setError(null);
  };

  // Fonction pour effacer les notifications
  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        fakeUser,
        login,
        logout,
        registerUser,
        validateAccount,
        resendValidationEmail,
        connectedUser,
        isLoggedIn,
        token,
        userId,
        isLoading,
        error,
        notification,
        pendingAccount,
        clearError,
        clearNotification,
        getUserSubscription,
        abonnement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
