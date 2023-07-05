import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';

const QA = ({ productId }) => {

   const [questionData, setQuestionData] = useState([])

  return (
    <>
      <h3>QUESTIONS & ANSWERS</h3>
      <Search setQuestionData={setQuestionData} questionData={questionData} />
      <QuestionList
        productId={productId}
        questionData={questionData}
        setQuestionData={setQuestionData}
      />
      <br />
      <h5>===== End of Q&A Section Here =====</h5>
      <br />
    </>
  );
};

export default QA;
