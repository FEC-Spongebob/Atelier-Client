import React from 'react';
import { useState } from 'react';
import AnswerList from './AnswerList.jsx';

const Question = ({question}) => {

  //Add Answer functionality

  //NOTE: answers can be a state variable here
  const [helpfulness, setHelpfulness] = useState(question["question_helpfulness"])
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  //TODO: inside of a useEffect that depends on question,
  //map question.answers keys to array of questions,
  //set answers to this new answers array

  const handleClick = () => {
    if (!alreadyVoted) {
    setHelpfulness(helpfulness + 1)
    setAlreadyVoted(true)
    } else {
      alert ('You can only vote once, sorry!')
    }
  }

  return (
    <div>
        <h4><b>Q: {question.question_body}</b></h4>
        <p><small>Helpful? <button onClick={handleClick}>Yes ({helpfulness})</button> | <button>Add Answer</button></small></p>
        {/* NOTE: after implementing answers state, pass that instead */}
        <AnswerList answers={question['answers']} />
    </div>
  )
}

export default Question;
