import React, { useState } from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";

export default function Question({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleShowAnswer = () => {
    setShowAnswer((prev) => (prev === false ? true : false));
  };
  return (
    <>
      {showAnswer ? (
        <div
          onClick={toggleShowAnswer}
          className="flex flex-col justify-center gap-2.5"
        >
          <div className="flex justify-between items-center p-5 gap-5 w-[1200px] max-1500:w-[900px] max-1100:w-[600px] max-sm:w-[300px] bg-white border shadow-md dark:bg-black dark:border-white dark:shadow-white">
            <div className="flex items-center gap-5">
              <div className="w-[30px]">
                <RiQuestionnaireFill className="text-fuchsia text-3xl" />
              </div>
              <h2 className="text-black text-2xl font-bold max-sm:text-xl dark:text-white">
                {question.question}
              </h2>
            </div>
            <div className="w-[30px]">
              <FaChevronUp className="text-black text-3xl dark:text-white" />
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 bg-white border shadow-md w-[1200px] max-1500:w-[900px] max-1100:w-[600px] max-sm:w-[300px] dark:bg-black dark:border-white dark:shadow-white">
            <div className="w-[30px]">
              <FaQuestionCircle className="text-fuchsia text-3xl relative" />
            </div>
            <h2 className="text-black text-2xl font-bold w-[1100px] max-1500:w-[800px] max-1100:w-[500px] max-sm:w-[200px] max-sm:text-xl dark:text-white">
              {question.answer}
            </h2>
          </div>
        </div>
      ) : (
        <div
          onClick={toggleShowAnswer}
          className="flex justify-between items-center p-[21px] w-[1200px] max-1500:w-[900px] max-1100:w-[600px] max-sm:w-[300px]"
        >
          <div className="flex items-center gap-5">
            <div className="w-[30px]">
              <RiQuestionnaireFill className="text-fuchsia text-3xl" />
            </div>
            <h2 className="text-black text-2xl font-bold w-fit max-sm:text-xl dark:text-white">
              {question.question}
            </h2>
          </div>
          <div className="w-[30px]">
            <FaChevronDown className="text-black text-3xl dark:text-white" />
          </div>
        </div>
      )}
    </>
  );
}
