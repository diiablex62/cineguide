import React from "react";
import BandeAnnonce from "./BandeAnnonceSerie";
import SerieProposer from "./SerieProposer";
import ResumeSerie from "./ResumeSerie";

export default function Tous() {
  return (
    <div className="md:w-2/3 flex-1 flex-col w-full ">
      <ResumeSerie />
      <BandeAnnonce />
      <SerieProposer />
    </div>
  );
}
