import React from "react";
import BandeAnnonce from "./BandeAnnonceSerie";
import SerieProposer from "./SerieProposer";
import ResumeSerie from "./ResumeSerie";

export default function Tous() {
  return (
    <div className=" flex-col w-full ">
      
      <BandeAnnonce />
      <SerieProposer />
    </div>
  );
}
