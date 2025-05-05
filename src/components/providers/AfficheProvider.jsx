import { useState, useCallback } from "react";
import { AfficheContext } from "../../context/AfficheContext";
import afficheData from "../../data/Affiche.json";
export const AfficheProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [stepGame, setStepGame] = useState(1);
  const [genreList, setGenreList] = useState([]);
  const [affiche, setAffiche] = useState(afficheData[0]);
  // Selection des genres par l'utilisateur
  function removeGenre() {
    setGenreList("");
  }

  // L'utilisateur ajoutes des genres
  function addGenreList(e) {
    e.preventDefault();
    const genre = e.target.genre.value;
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
    e.target.genre.value = "";
  }

  // Etape 2
  const [blurLevel, setBlurLevel] = useState(10);
  const [countDetails, setCountDetails] = useState(10);
  const [countIndice, setCountIndice] = useState(affiche.indices.length - 1);
  const [currentIndiceIndex, setCurrentIndiceIndex] = useState(0);
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

  // Reponse
  const [reponse, setReponse] = useState(affiche.titre);

  // WIN ou LOOSE
  const [winOrLoose, setWinOrLoose] = useState(false);
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
      }}
    >
      {children}
    </AfficheContext.Provider>
  );
};
