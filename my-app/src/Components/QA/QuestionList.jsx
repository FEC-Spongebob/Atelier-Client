import Modal from 'react-modal';
import React, { useState } from 'react';
import Question from './Question.jsx';


const QuestionList = ({ questions }) => {

  //NOTE: length isn't needed as state; can use questions.length
  const [length, setLength] = useState(questions.length)

  //   Show 4 q's at a time; splice array in case there are more questions
  //   Display questions in order of helpfulness
  //   More Answered Questions button

  return (
    <>
    {/* NOTE: mapped components should have a unique key prop */}
      {length === 0 ? (
        <p>No questions. Add one below!</p>
      ) : (
        questions.map((question) => (
          <Question question={question} />
        ))
      )}
    </>
  )
};

export default QuestionList;