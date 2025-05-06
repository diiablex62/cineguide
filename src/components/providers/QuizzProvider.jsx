import { useState } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import dataPerso from "../../data/QuestionsPerso.json";

export default function QuizzProvider({ children }) {
  const [questionsPerso, setQuestionsPerso] = useState([dataPerso]);

  const updateQuestionsPerso = (values) => {
    setQuestionsPerso([...questionsPerso, values]);
    console.log(questionsPerso);
  };
  return (
    <QuizzContext.Provider value={{ questionsPerso, updateQuestionsPerso }}>
      {children}
    </QuizzContext.Provider>
  );
}
