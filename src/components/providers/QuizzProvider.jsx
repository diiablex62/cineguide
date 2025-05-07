import { useState } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import dataPerso from "../../data/QuestionsPerso.json";

export default function QuizzProvider({ children }) {
  const [questionsPerso, setQuestionsPerso] = useState(() => {
    const savedQuestions = localStorage.getItem("quizz_perso_reponses");
    return savedQuestions ? JSON.parse(savedQuestions) : dataPerso;
  });

  const updateQuestionsPerso = (updatedQuestions) => {
    setQuestionsPerso(updatedQuestions);
  };

  return (
    <QuizzContext.Provider value={{ questionsPerso, updateQuestionsPerso }}>
      {children}
    </QuizzContext.Provider>
  );
}
