import React, { useState } from "react";

import { ProfilContext } from "../../context/ProfilContext";
import Facture from "../../data/Facture.json";

export default function ProfilProvider({ children }) {
  return (
    <ProfilContext.Provider value={{ Facture }}>
      {children}
    </ProfilContext.Provider>
  );
}
