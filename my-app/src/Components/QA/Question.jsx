import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import { getAnswers, markQuestionAsHelpful } from './routes.js';
import AnswerModal from './AnswerModal.jsx';

const Question = ({ questionId, question }) => {
  console.log('question in Q', question);

  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  const [voted, setVoted] = useState(false);
  const [answerData, setAnswerData] = useState([]);
  const [alreadyReported, setAlreadyReported] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [answer, setAnswer] = useState('');



  useEffect(() => {
    getAnswers(questionId)
      .then((response) => {
        console.log('answers=====', response);
        setAnswerData(response);
      })
      .catch((error) => console.error('Error fetching answers in Question component', error));
  }, [questionId]);

  const handleClick = () => {
    if (!voted) {
      markQuestionAsHelpful(question.question_id);
      setHelpfulness(helpfulness + 1);
      setVoted(true);
    } else {
      alert('You can only vote once, sorry!');
    }
  };

  const handleReport = () => {
    setAlreadyReported(true);
  };




  return (
    <div>
      <div>
        <h4>
          <b>Q: {question.question_body}</b>
        </h4>
        <p style={{ paddingRight: '20px' }}>
          <small>
            Helpful?&nbsp;
            <button onClick={handleClick} style={{ textDecorationLine: 'underline' }}>
              Yes ({helpfulness})
            </button>
            <AnswerModal questionId={questionId} answer={answer} setAnswer={setAnswer}/>
            |&nbsp;&nbsp;
            {alreadyReported ? (
              <button disabled style={{ textDecorationLine: 'underline' }}>
                Reported
              </button>
            ) : (
              <button style={{ textDecorationLine: 'underline' }} onClick={() => handleReport()}>
                Report
              </button>
            )}
          </small>
        </p>

      </div>
      {answerData.length === 0 ? (
        <p><small>No answers.</small></p>
      ) : (
        <>
          {answerData.map((answer) => (
            <Answer key={answer.answer_id} answerId={answer.answer_id} answer={answer} helpfulness={answer.helpfulness} />
          ))}
        </>
      )}
    </div>
  );
};

export default Question;
