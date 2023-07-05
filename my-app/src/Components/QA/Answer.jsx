import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { markAnswerAsHelpful, reportAnswer } from './routes.js';

const Answer = ({ answer, answerId, helpfulness }) => {

  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [alreadyReported, setAlreadyReported] = useState(false);

  // useEffect(() => {
  //   markAnswerAsHelpful(answerId)
  //     .then((response) =>
  //     console.log('helpfulness response', response))
  //     //setHelpfulness(response))
  //      .catch(error => console.error('Error with helpfulness property'))
  // }, [answerId]);

  const handleClick = () => {
    if (!alreadyVoted) {
      setAlreadyVoted(true);
    } else {
      alert('You can only vote once, sorry!');
    }
  };

  useEffect(() => {
    reportAnswer(answerId)
      .then((response) =>
      console.log('response', response))
      //setAlreadyReported(response))
       .catch(error => console.error('Error with reported property'))
  }, [answerId]);


  const handleSubmit = () => {
      setAlreadyVoted(true);
  };

  return (
    <>
      <p style={{textAlign: 'left', paddingLeft: '55px'}}>
        <b>A: </b>
        {answer.body}
      </p>
      <p style={{textAlign: 'left', paddingLeft: '55px'}}>
        <small>
          by {answer.answerer_name}, {format(new Date(answer.date), 'MM/dd/yyyy')} &nbsp;&nbsp; | &nbsp;&nbsp; Helpful?
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
