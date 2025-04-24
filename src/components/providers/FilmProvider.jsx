import React, { useState } from "react";

import { FilmContext } from "../../context/FilmContext";
import FilmData from "../../data/Film.json";
export default function FilmProvider({ children }) {
  const [goSeeStates, setGoSeeStates] = useState({});
  const [alreadySeenStates, setAlreadySeenStates] = useState({});
  const [openInfoStates, setOpenInfoStates] = useState({});

  function toggleState(setter, index) {
    setter((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }
  return (
    <FilmContext.Provider
      value={{
        FilmData,
        goSeeStates,
        alreadySeenStates,
        openInfoStates,
        toggleState,
        setGoSeeStates,
        setAlreadySeenStates,
        setOpenInfoStates,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}
