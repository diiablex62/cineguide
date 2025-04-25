import React, { useState } from "react";
import Resume from "./Resume";
import BandeAnnonce from "./BandeAnnonce";
import Commentaire from "./Commentaire";
import FilmProposer from "./FilmProposer";

export default function Tous() {
 
  
  return (
    <div className="md:w-2/3 flex-1 flex-col justify-center items-center">
      <Resume  />
      <BandeAnnonce  />
      <Commentaire />
      <FilmProposer  />
    </div>
  );
}
