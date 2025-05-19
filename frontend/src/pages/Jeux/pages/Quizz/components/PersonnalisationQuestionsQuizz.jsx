import React, { useState, useContext, useEffect } from "react";
import { QuizzContext } from "../../../../../context/QuizzContext";
import { useNavigate } from "react-router-dom";

export default function PersonnalisationQuestionsQuizz() {
  const { questionsPerso, updateQuestionsPerso } = useContext(QuizzContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(questionsPerso);
    const saved = localStorage.getItem("quizz_perso_reponses");
    if (saved) {
      const obj = JSON.parse(saved);
      setInputValue(obj[currentQuestion]?.response || "");
    } else {
      setInputValue("");
    }
  }, [currentQuestion]);

  const onSubmit = (event) => {
    event.preventDefault();
    // Update the questionsPerso state with the user's response
    const updatedQuestions = [...questionsPerso];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      response: inputValue,
    };
    updateQuestionsPerso(updatedQuestions);

    // Store the question and response in localStorage
    const saved = localStorage.getItem("quizz_perso_reponses");
    const obj = saved ? JSON.parse(saved) : updatedQuestions;
    obj[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      response: inputValue,
    };
    localStorage.setItem("quizz_perso_reponses", JSON.stringify(obj));

    setInputValue("");
    if (currentQuestion < questionsPerso.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion >= questionsPerso.length - 1) {
      navigate("/jeux/quizz");
    }
  };

  return (
    <div className='flex flex-col gap-2.5 py-11 px-14 h-full'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-bold'>Quiz Personnalisé</h2>
        <p className='italic text-gray-500'>
          <span className='underline'>Objectif</span> : répondre aux questions
          posées en rapport avec vos préférences.{" "}
          <span className='underline'>
            Attention : la vitesse des réponses compte !
          </span>
        </p>
      </div>
      <h3 className='font-bold text-xl'>Etape 1 :</h3>
      <div className='flex py-7'>
        <div className='flex flex-col gap-9 items-center justify-center w-full'>
          <div className='flex flex-col gap-2.5 items-center w-full'>
            <p className='text-fuchsia p-2.5 w-full font-medium'>
              {`Question ${currentQuestion + 1} / ${questionsPerso.length}`}
            </p>
            <div className='p-8 border border-black bg-white w-full'>
              <p className='font-medium text-center'>
                {questionsPerso[currentQuestion].question}
              </p>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className='flex flex-col gap-2.5 items-center w-full'>
            <p className='text-fuchsia p-2.5 w-full font-medium'>
              Veuillez répondre ci-dessous :
            </p>
            <input
              type='text'
              className='p-8 border border-black bg-white w-full'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type='submit'
              className='bg-fuchsia flex justify-center items-center h-[50px] px-2 text-white cursor-pointer'>
              Passer à la question suivante
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
