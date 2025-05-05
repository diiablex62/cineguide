import { useState } from "react";
import { QuizzContext } from "../../context/QuizzContext";
// import dataPerso from "../../data/QuestionsPerso.json";

export default function QuizzProvider({ children }) {
  const [questionsPerso, setQuestionsPerso] = useState([]);
  const test = "ouais";

  const updateQuestionsPerso = (values) => {
    // setQuestionsPerso([...questionsPerso, values]);
    console.log(dataPerso);
    // console.log(questionsPerso);
  };
  return (
    <QuizzContext.Provider
      value={{ questionsPerso, updateQuestionsPerso, test }}
    >
      {children}
    </QuizzContext.Provider>
  );
}
