import React from 'react';
import Question from './Question.jsx';

const QuestionList = ({ questionData, productName }) => {

  return (
    <>
      {questionData.length === 0 ? (
        <>
          <p>No questions. Add one below!</p>
          <button>Add a New Question</button>
        </>
      ) : (
        <>
          {questionData
            .map((question) => (
              <Question questionID={question.question_id} question={question} productName={productName} />
            ))}
        </>
      )}
    </>
  );
};

export default QuestionList;