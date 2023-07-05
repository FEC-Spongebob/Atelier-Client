import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { markAnswerAsHelpful, reportAnswer } from './routes.js';

const Answer = ({ answer }) => {
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [alreadyReported, setAlreadyReported] = useState(answer.reported);

  const handleClick = () => {
    if (!alreadyVoted) {
      console.log('answer', answer)
      markAnswerAsHelpful(answer.answer_id);
      setHelpfulness(helpfulness + 1);
      setAlreadyVoted(true);
    } else {
      alert('You can only vote once, sorry!');
    }
  };

  const handleSubmit = (answerId) => {
    if (!alreadyReported) {
      reportAnswer(answerId)
        .then(() => {
          alert('Answer has been reported')
          setAlreadyReported(true);
        })
        .catch(error => console.error('Error reporting', error))
    }
  };

  return (
    <>
      <p>
        <b>A: </b>
        {answer.body}
      </p>
      <p>
        <small>
          by {answer.answerer_name}, {format(new Date(answer.date), 'MM/dd/yyyy')} &nbsp;&nbsp; | &nbsp;&nbsp; Helpful?{' '}
          <button onClick={handleClick} style={{ textDecorationLine: 'underline' }}>
            Yes ({helpfulness})
          </button>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          {alreadyReported ? (
            <button  disabled>
              Reported
            </button>
          ) : (
            <button style={{ textDecorationLine: 'underline' }} onClick={() => handleSubmit(answer.answer_id)}>
              Report
            </button>
          )}
        </small>
      </p>
    </>
  );
};

export default Answer;
