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
      console.log("Vérification des données d'authentification sauvegardées");
      setIsLoading(true);
      
      try {
        // Récupération des données depuis les cookies
        const savedToken = getCookie("token");
        const savedUserId = getCookie("userId");
        const savedUserData = getCookie("userData");
    
        if (savedToken && savedUserId) {
          console.log("Données d'authentification trouvées dans les cookies");
          
          // Vérifier que le token est toujours valide
          const { isValid, userData } = await authAPI.verifyToken(savedToken);
          
          if (isValid) {
            console.log("Token valide, restauration de la session");
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
                  ...parsedUserData
                });
                console.log("Données utilisateur restaurées depuis les cookies");
              } catch (error) {
                console.error("Erreur lors du parsing des données utilisateur:", error);
              }
            }
          } else {
            console.log("Token expiré ou invalide, déconnexion");
            // Supprimer les informations périmées
            logout();
          }
        } else {
          console.log("Aucune donnée d'authentification trouvée");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
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
      console.log("Tentative de connexion avec:", credentials);
      setError(null);
      const data = await authAPI.login(credentials);

      // Sauvegarder dans le state
      setToken(data.token);
      setUserId(data.userId);
      setIsLoggedIn(true);
      setConnectedUser(true);

      // Mettre à jour les données utilisateur
      const userData = {
        email: data.email || credentials.email,
        firstname: data.prenom || "",
        lastname: data.nom || "",
      };

      setUser({
        ...defaultUser,
        ...userData
      });

      // Persister dans les cookies
      setCookie("token", data.token);
      setCookie("userId", data.userId);
      setCookie("userData", JSON.stringify(userData));
      console.log("Données d'authentification sauvegardées dans les cookies");

      return data;
    } catch (error) {
      console.error("Échec de connexion:", error);
      
      // Gérer le cas où le compte est en attente de validation
      if (error.status === 403 && error.data?.isPending) {
        setPendingAccount(credentials.email);
        setError("Votre compte est en attente de validation. Veuillez vérifier votre email.");
      } else {
        setError(error.message || "Erreur lors de la connexion");
      }
      
      throw error;
    }
  };

  // Fonction d'inscription avec appel API
  const registerUser = async (userData) => {
    try {
      console.log("Tentative d'inscription avec:", userData);
      setError(null);

      // Adapter le format des données si nécessaire
      const formattedData = {
        nom: userData.nom || userData.lastname,
        prenom: userData.prenom || userData.firstname,
        email: userData.email,
        password: userData.password,
      };

      const data = await authAPI.register(formattedData);

      // Pour le nouveau système, l'inscription retourne uniquement un message
      // et l'utilisateur doit valider son compte par email
      if (data && data.message && data.email) {
        setPendingAccount(data.email);
        setNotification(data.message);
        return data;
      }

      // Ancien comportement (au cas où)
      if (data && data.token && data.user) {
        // Sauvegarder dans le state
        setToken(data.token);
        setUserId(data.user._id);
        setIsLoggedIn(true);
        setConnectedUser(true);

        // Préparer les données utilisateur
        const userInfo = {
          email: data.user.email,
          firstname: data.user.prenom,
          lastname: data.user.nom,
        };

        // Mettre à jour les données utilisateur
        setUser({
          ...defaultUser,
          ...userInfo
        });

        // Persister dans les cookies
        setCookie("token", data.token);
        setCookie("userId", data.user._id);
        setCookie("userData", JSON.stringify(userInfo));
        console.log("Données d'authentification sauvegardées dans les cookies après inscription");
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
      console.log("Tentative de validation de compte avec token:", token);
      setError(null);
      
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
          ...userInfo
        });

        // Persister dans les cookies
        setCookie("token", data.token);
        setCookie("userId", data.user._id);
        setCookie("userData", JSON.stringify(userInfo));
        console.log("Données d'authentification sauvegardées dans les cookies après validation");
        
        setNotification(data.message || "Votre compte a été validé avec succès!");
      }
      
      return data;
    } catch (error) {
      console.error("Échec de validation de compte:", error);
      setError(error.message || "Erreur lors de la validation du compte");
      throw error;
    }
  };

  // Fonction pour renvoyer l'email de validation
  const resendValidationEmail = async (email) => {
    try {
      console.log("Tentative de renvoi d'email de validation pour:", email);
      setError(null);
      
      const data = await authAPI.resendValidationEmail(email || pendingAccount);
      
      if (data && data.message) {
        setNotification(data.message);
      }
      
      return data;
    } catch (error) {
      console.error("Échec du renvoi d'email de validation:", error);
      setError(error.message || "Erreur lors du renvoi de l'email de validation");
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
    console.log("Données d'authentification supprimées des cookies");
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
        clearNotification
      }}>
      {children}
    </AuthContext.Provider>
  );
}
