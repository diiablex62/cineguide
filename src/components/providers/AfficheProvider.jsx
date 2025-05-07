import { useState, useCallback } from "react";
import { AfficheContext } from "../../context/AfficheContext";
import afficheData from "../../data/Affiche.json";

import toast, { Toaster } from "react-hot-toast";
export const AfficheProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [stepGame, setStepGame] = useState(1);
  const [genreList, setGenreList] = useState([]);
  const [difficulty, setDifficulty] = useState(1);
  const [affiche, setAffiche] = useState("");

  const [blurLevel, setBlurLevel] = useState(0);
  const [countDetails, setCountDetails] = useState(0);
  const [countIndice, setCountIndice] = useState(0);
  const [currentIndiceIndex, setCurrentIndiceIndex] = useState(0);

  const [tryReponse, setTryReponse] = useState(0);
  // Reponse
  const [reponse, setReponse] = useState("");

  // WIN ou LOOSE
  const [winOrLoose, setWinOrLoose] = useState(false);
  // Selection des genres par l'utilisateur
  function removeGenre() {
    setGenreList("");
  }

  // Fonction qui gere les genres que l'utilisateur entre
  function addGenreList(e, genreRef) {
    const genre = genreRef.current.value.trim(); //

    if (genre === "") {
      toast.error("Le genre ne peut pas être vide.");
      return;
    }
    if (genreList.includes(genre)) {
      toast.error("Ce genre est déjà ajouté.");
      return;
    }
    if (genreList.length >= 10) {
      toast.error("Vous ne pouvez pas ajouter plus de 10 genres.");
      return;
    }
    setGenreList((prevGenreList) => [...prevGenreList, genre]);
    toast.success("Genre ajouté avec succès !");
    genreRef.value = "";
  }

  // On verifi si il y a un theme, un genre et un niveau de difficulté
  function initGames(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedTheme = formData.get("theme");
    const difficulty = formData.get("difficulty");

    if (!selectedTheme) {
      toast.error("Veuillez sélectionner un thème.");
      return;
    }

    if (!difficulty) {
      toast.error("Veuillez sélectionner une difficulté.");
      return;
    }

    if (!genreList) {
      toast.error("Veuillez sélectionner un genre.");
      return;
    }

    const filteredAffiches = afficheData.filter((item) =>
      genreList.some((genre) => item.genre?.includes(genre))
    );

    const filteredAffichesByType = filteredAffiches.filter(
      (item) => item.type === selectedTheme
    );

    if (filteredAffichesByType.length > 0) {
      const filteredAffichesByGenre = filteredAffichesByType.filter((item) =>
        genreList.some((genre) =>
          Array.isArray(item.genre)
            ? item.genre.some((g) =>
                g.toLowerCase().includes(genre.toLowerCase())
              )
            : typeof item.genre === "string" &&
              item.genre.toLowerCase().includes(genre.toLowerCase())
        )
      );

      if (filteredAffichesByGenre.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * filteredAffichesByGenre.length
        );
        setAffiche(filteredAffichesByGenre[randomIndex]);
      } else {
        toast.error("Aucune affiche ne correspond aux genres sélectionnés.");
        return;
      }
    } else {
      toast.error("Aucune affiche ne correspond au type sélectionné.");
      return;
    }

    setSelectedTheme(selectedTheme);
    setDifficulty(difficulty);
    setBlurLevel(difficulty);
    setCountDetails(difficulty);
    setCountIndice(11 - difficulty);
    setTryReponse(11 - difficulty);
    setStepGame(2);
  }

  function endGame(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputValue = formData.get("reponse");

    if (reponse.toLowerCase() === inputValue.toLowerCase()) {
      setWinOrLoose(true);
      setStepGame(3);
    } else if (tryReponse > 0) {
      setTryReponse(tryReponse - 1);
      toast.success("Encore " + tryReponse + " essai(s)");
    } else {
      setWinOrLoose(false);
      setStepGame(3);
    }
  }
  // Etape 2

  // Reveal de l'image en fonction de la difficulté
  const handleRevealClick = () => {
    if (blurLevel > 0) {
      setBlurLevel(blurLevel - 1);
      setCountDetails(countDetails - 1);
    }
  };

  // Ajout d'indice
  const handleNextIndiceClick = () => {
    if (countIndice > 0) {
      if (currentIndiceIndex < affiche.indices.length - 1) {
        setCurrentIndiceIndex(currentIndiceIndex + 1);
        setCountIndice(countIndice - 1);
      }
    }
  };

  // Révéler = loose
  const handleRevealAllClick = () => {
    setWinOrLoose(false);
    setStepGame(3);
  };

  // Reset la games a zero
  const reset = () => {
    setStepGame(1);
    setBlurLevel(10);
    setCountDetails(10);
    setCountIndice(affiche.indices.length - 1);
    setCurrentIndiceIndex(0);
  };

  return (
    <AfficheContext.Provider
      value={{
        selectedTheme,
        genreList,
        setSelectedTheme,
        removeGenre,
        setGenreList,
        addGenreList,
        setStepGame,
        stepGame,
        blurLevel,
        setBlurLevel,
        handleRevealClick,
        handleNextIndiceClick,
        handleRevealAllClick,
        currentIndiceIndex,
        countDetails,
        countIndice,
        reponse,
        reset,
        setWinOrLoose,
        winOrLoose,
        affiche,
        difficulty,
        setDifficulty,
        initGames,
        setGenreList,
        endGame,
        setReponse,
      }}
    >
      {children}
    </AfficheContext.Provider>
  );
};
