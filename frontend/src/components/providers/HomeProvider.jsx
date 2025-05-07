import { useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import series from "../../data/Serie.json";
import genres from "../../data/Genre.json";

export const HomeProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedType, setSelectedType] = useState({
    film: false,
    serie: false,
  });
  const [selectedNote, setSelectedNote] = useState("");
  const [filteredResult, setFilteredResult] = useState(null);
  const [errors, setErrors] = useState({
    genre: false,
    type: false,
    note: false,
  });

  const value = {
    selectedGenre,
    setSelectedGenre,
    selectedType,
    setSelectedType,
    selectedNote,
    setSelectedNote,
    filteredResult,
    setFilteredResult,
    errors,
    setErrors,
    series,
    genres, 
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
