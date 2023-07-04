import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './QuestionModal.jsx';
import { getAllQuestions, getProductName } from './routes.js';

const QA = ({ productId }) => {
  const [productName, setProductName] = useState('');
  const [question, setQuestion] = useState('');
  const [questionData, setQuestionData] = useState('');


  useEffect(() => {
    getProductName(productId)
      .then((response) => {
        setProductName(response.name);
      })
      .catch((error) => console.error('Error fetching answers in Question component', error));
  }, [productId]);


  return (
    <>
      <h3>QUESTIONS & ANSWERS</h3>
      <Search productId={productId} setQuestionData={setQuestionData} questionData={questionData} getAllQuestions={getAllQuestions} />
      <QuestionList questionData={questionData} productName={productName} />
      <QuestionModal
        productName={productName}
        question={question}
        productId={productId}
        setQuestion={setQuestion}
      />
      <br />
      <h5>===== End of Q&A Section Here =====</h5>
      <br />
    </>
  );
};

export default QA;
