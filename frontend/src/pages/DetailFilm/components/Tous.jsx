import React, { useState } from "react";

import BandeAnnonce from "./BandeAnnonce";
import FilmProposer from "./FilmProposer";

export default function Tous() {
  
  return (
    <div className=" flex-col justify-center items-center">
     
      <BandeAnnonce />
      <FilmProposer />
    </div>
  );
}
