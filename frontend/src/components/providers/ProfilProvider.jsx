import React, { useState } from "react";

import { ProfilContext } from "../../context/ProfilContext";
import Facture from "../../data/Facture.json";

export default function ProfilProvider({ children }) {
  console.log("ProfilProvider initialisé avec", Facture.length, "factures");

  return (
    <ProfilContext.Provider value={{ Facture }}>
      {children}
    </ProfilContext.Provider>
  );
}
