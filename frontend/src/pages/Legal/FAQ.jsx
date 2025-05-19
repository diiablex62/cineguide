import React from "react";
import { RiQuestionAnswerFill } from "react-icons/ri";
import questionsFAQ from "../../data/questionsFAQ.json";
import OneQuestion from "../../components/Question/OneQuestion";

export default function FAQ() {
  return (
    <div className='flex flex-col items-center justify-center gap-12 mt-12 mb-10 bg-white dark:bg-black'>
      <div className='flex items-center justify-center gap-5'>
        <RiQuestionAnswerFill className='text-fuchsia text-4xl' />
        <h2 className='text-black text-4xl font-bold max-sm:text-2xl dark:text-white'>
          FAQ
        </h2>
      </div>
      <div className='flex flex-col items-center justify-center gap-12 w-full px-4'>
        {questionsFAQ.map((question) => (
          <OneQuestion question={question} key={question.id} />
        ))}
      </div>
    </div>
  );
}
