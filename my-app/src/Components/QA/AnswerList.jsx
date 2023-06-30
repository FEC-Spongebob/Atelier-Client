import Question from './Question.jsx';
import React, { useState } from 'react';
import Answer from './Answer.jsx';

//  when setMoreAnswers === true, change copy of button to "Collapse answers" and set view to be confined to half of the screen, and the list within should be scrollable.
// make a state in case answers are added?
// console.log('1answer', answers[firstObj].helpfulness)

const AnswerList = ({ answers }) => {
  const [expandAnswers, setExpandAnswers] = useState(false);
  const [buttonCopy, setButtonCopy] = useState('See more answers');
  const [ids, setIds] = useState(Object.keys(answers)); //NOTE: not needed if mapped in parent component

  const handleExpand = () => {
    setExpandAnswers(!expandAnswers);
    console.log('expandAnswers', expandAnswers)
    if (!expandAnswers) {
      setButtonCopy('Collapse answers')
    } else {
      setButtonCopy('See more answers')
    }
  };

  return (
    <>
      {ids.length === 0 ? (
        <p>There are no answers to this question. Add one below!</p>
      ) : (
        <>
          {ids.slice(0, expandAnswers ? ids.length : 2).map((id) => (
            <Answer answer={answers[id]} key={id} />
          ))}
          {ids.length > 2 && (
            <button onClick={handleExpand}>{buttonCopy}</button>
          )}
        </>
      )}
    </>
  );
};

export default AnswerList;