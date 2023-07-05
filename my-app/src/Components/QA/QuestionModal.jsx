import React, { useRef, useState } from 'react';
import { addQuestion } from './routes.js';

const QuestionModal = ({ productName, question, productId, setQuestion }) => {
  const questionModalRef = useRef(null);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isQuestionValid, setIsQuestionValid] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const openQuestionModal = () => {
    const questionModal = questionModalRef.current;
    if (questionModal) {
      questionModal.showModal();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isQuestionValid && isNicknameValid && isEmailValid && validateEmail(email)) {
      console.log('New question submitted successfully');
      addQuestion(productId, question, nickname, email)
        .then(() => {
          alert('Question submitted!');
          setQuestion('');
          setNickname('');
          setEmail('');
          setIsQuestionValid(false);
          setIsEmailValid(false);
          setIsNicknameValid(false);
          const questionModal = questionModalRef.current;
          if (questionModal) {
            questionModal.close();
          }
        })
        .catch((error) => {
          console.error('Error submitting question:', error);
        });
    } else {
      setIsWarningVisible(true);
    }
  };

  const handleClose = (e) => {
    const questionModal = questionModalRef.current;
    if (questionModal) {
      questionModal.close();
      setQuestion('');
      setNickname('');
      setEmail('');
    }
  };

  return (
    <>
      <button
        onClick={openQuestionModal}
        className="btn"
        style={{ textAlign: 'center', lineHeight: '29px', fontSize: '13px', cursor: 'pointer' }}
      >
        Add a Question +
      </button>
      <div>
        <dialog ref={questionModalRef} id="questionmodal" name="modal" style={{ width: '500px', textAlign: 'left' }}>
          <form onSubmit={handleSubmit} method="dialog" className="modal-box" style={{ width: '100%' }}>
            <div id="heading" style={{ padding: '16px 0', minHeight: '56px', marginRight: '24px', lineHeight: '24px', fontSize: '16px', fontWeight: '700', textSizeAdjust: '100%' }}>
              <h1 className="font-bold text-lg">Ask Your Question</h1>
              <h2>About the {productName}</h2>
            </div>
            <div style={{ padding: '16px 0' }}>
          <div>
            <label htmlFor="questionInput">
              Your question<span>* </span>
              <input
                id="questionInput"
                name="question"
                rows="2"
                style={{ width: '100%' }}
                maxLength="1000"
                placeholder="Example: Why did you like the product or not?"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setIsQuestionValid(e.target.value.trim().length > 0);
                }}
                required
              />
            </label>
          </div>
          <div style={{ paddingTop: '25px' }}>
            <label htmlFor="nicknameInput">
              Your nickname<span>* </span>
              <input
                id="nicknameInput"
                type="text"
                name="nickname"
                style={{ width: '100%' }}
                maxLength="60"
                rows="1"
                placeholder="Example: jackson11!"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setIsNicknameValid(e.target.value.trim().length > 0);
                }}
                required
              />
            </label>
            <br />
            <small>
              <em>For privacy reasons, do not use your full name or email address.</em>
            </small>
          </div>
          <div style={{ paddingTop: '25px', paddingBottom: '15px' }}>
            <label htmlFor="nicknameInput">
              Your email<span>* </span>
              <input
                id="emailInput"
                type="text"
                name="email"
                style={{ width: '100%' }}
                maxLength="60"
                rows="1"
                placeholder="Example: jack@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailValid(validateEmail(e.target.value));
                }}
                required
              />
            </label>
            <br />
            <small>
              <em>For authentication reasons, you will not be emailed.</em>
            </small>
          </div>
        </div>

        <div>
          <button className="btn" style={{ textAlign: 'center', lineHeight: '29px', fontSize: '13px', cursor: 'pointer' }}>
            Submit
          </button>
          <button
            className="btn"
            style={{ textAlign: 'center', lineHeight: '29px', fontSize: '13px', margin: '10px', cursor: 'pointer' }}
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        {isWarningVisible && (
          <p style={{ color: 'red', fontSize: '12px' }}>
            You must enter the following correctly: {isQuestionValid ? '' : 'Question, '}
            {isNicknameValid ? '' : 'Nickname, '}
            {isEmailValid ? '' : 'Email'}
          </p>
        )}
          </form>
        </dialog>
      </div>
    </>
  );
};

export default QuestionModal;
