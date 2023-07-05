import React, { useEffect, useState } from 'react';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
import { getAllQuestions, addQuestion } from './routes.js';

const QuestionList = ({ productId, questionData, setQuestionData }) => {
  const [sortedQuestions, setSortedQuestions] = useState([]);
  //const [visibleQuestions, setVisibleQuestions] = useState(2);

  useEffect(() => {
    getAllQuestions(productId)
      .then(data => {
        setQuestionData(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [productId]);

  useEffect(() => {
    if (questionData && questionData.length > 0) {
      const sortedArr = [...questionData];
      sortedArr.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
      setSortedQuestions(sortedArr);
    }
  }, [questionData]);

  // const handleLoadMore = () => {
  //   setVisibleQuestions(prev => prev + 2);
  // };

  return (
    <>
      {sortedQuestions.slice(0,2).map((question, index) => (
        // (index < visibleQuestions) && (
          <Question key={question.question_id} questionId={question.question_id} question={question} />
        )
    //  )
      )}
      {/* {sortedQuestions.length > visibleQuestions && (
        <button
          className="btn"
          style={{
            textAlign: 'center',
            lineHeight: '29px',
            fontSize: '13px',
            margin: '10px',
            cursor: 'pointer',
          }}
          onClick={handleLoadMore}
        >
          Show More
        </button>
      )} */}
      <QuestionModal productId={productId} setQuestionData={setQuestionData} />
    </>
  );
};

export default QuestionList;
