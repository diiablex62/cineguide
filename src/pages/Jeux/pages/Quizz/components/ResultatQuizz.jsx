import React from "react";
import { useTranslation } from "react-i18next";

export default function ResultatQuizz() {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t("quiz.resultat", "ResultatQuizz")}</h2>
    </div>
  );
}
