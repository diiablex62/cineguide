import React, { useContext, useEffect } from "react";
import BandeAnnonce from "./BandeAnnonceSerie";
import SerieProposer from "./SerieProposer";
import { SerieContext } from "../../../context/SerieContext";
import { useParams } from "react-router-dom";

export default function Tous() {
  const { id } = useParams();
  const { loadSerieDetails, detailSerie, loading } = useContext(SerieContext);

  // Charger les détails de la série si nécessaire
  useEffect(() => {
    if (id && (!detailSerie || String(detailSerie.id) !== String(id))) {
      loadSerieDetails(id);
    }
  }, [id, detailSerie, loadSerieDetails]);

  if (loading) {
    return (
      <div className="p-4 text-center">Chargement des informations...</div>
    );
  }

  return (
    <div className="flex-col w-full">
      {detailSerie?.bandeAnnonce && <BandeAnnonce />}
      <SerieProposer />
    </div>
  );
}
