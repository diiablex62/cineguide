import React from "react";
import { RiQuestionAnswerFill } from "react-icons/ri";
import questionsFAQ from "../../data/questionsFAQ.json";
import Question from "../../components/Question/Question";

export default function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 mt-12">
      <div className="flex items-center justify-center gap-5">
        <RiQuestionAnswerFill className="text-fuchsia text-4xl" />
        <h2 className="text-black text-4xl font-bold max-sm:text-2xl dark:text-white">
          Foire aux question (FAQ)
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-12">
        {questionsFAQ.map((question) => (
          <Question question={question} key={question.id} />
        ))}
      </div>
    </div>
  );
}
