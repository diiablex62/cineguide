import React, { useState } from "react";

import { FiltreContext } from "../../context/FiltreContext";

export default function FilmProvider({ children }) {
  const [openFilter, setOpenFilter] = useState(false);

  function toggleFilter() {
    setOpenFilter(!openFilter);
  }

  return (
    <FiltreContext.Provider value={{ openFilter, toggleFilter }}>
      {children}
    </FiltreContext.Provider>
  );
}
