import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';

const QA = ({ productID }) => {
  const [productName, setProductName] = useState('');
  const [question, setQuestion] = useState('');
  const [questionData, setQuestionData] = useState('');


  useEffect(() => {
    getProductName(productID)
      .then((response) => {
        setProductName(response.name);
      })
      .catch((error) => console.error('Error fetching answers in Question component', error));
  }, [productID]);


  return (
    <>
      <h3>QUESTIONS & ANSWERS</h3>
      <Search productID={productID} setQuestionData={setQuestionData} questionData={questionData} getAllQuestions={getAllQuestions} />
      <QuestionList questionData={questionData} productName={productName} />
      <QuestionModal
        productName={productName}
        question={question}
        productID={productID}
        setQuestion={setQuestion}
      />
      <br />
      <h5>===== End of Q&A Section Here =====</h5>
      <br />
    </>
  );
};

export default QA;
