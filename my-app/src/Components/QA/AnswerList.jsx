import Question from './Question.jsx';
import React, { useState } from 'react';
import Answer from './Answer.jsx';

const AnswerList = ({ answers }) => {

  return (
    <>
    <p>AnswerList here</p>
      {answers.length === 0 ? (
        <p>There are no answers to this question. Add one below!</p>
      ) : (
        <>
          {answers.map((answer, index) => (
            <Answer answer={answer} key={index} />
          ))}
        </>
      )}
    </>
  );
};

export default AnswerList;
