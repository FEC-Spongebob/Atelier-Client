import React, { useState, useEffect, useRef } from 'react';
import AnswerList from './AnswerList.jsx';
import { getAnswers, markQuestionAsHelpful, addAnswer } from './routes.js';

const Question = ({ questionID, question }) => {
  const [answers, setAnswers] = useState([]);
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isAnswerValid, setIsAnswerValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [voted, setVoted] = useState(false);
  const answerModalRef = useRef(null);

  useEffect(() => {
    getAnswers(questionID)
      .then(data => {
        console.log('data', data)
        console.log('data', data.results)
        setAnswers(data);
      })
      .catch(error => console.error('Error fetching answers in Question component', error));
  }, [questionID]);

  const openAnswerModal = () => {
    const answerModal = answerModalRef.current;
    if (answerModal) {
      answerModal.showModal();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleClick = () => {
    if (!voted) {
      markQuestionAsHelpful(question.question_id);
      setHelpfulness(helpfulness + 1);
      setVoted(true);
    } else {
      alert('You can only vote once, sorry!');
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newUploadedPhotos = [...uploadedPhotos];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const uploadedPhoto = {
          name: file.name,
          src: e.target.result,
        };

        newUploadedPhotos.push(uploadedPhoto);
        setUploadedPhotos(newUploadedPhotos);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('test', isAnswerValid && isNicknameValid && isEmailValid && validateEmail(email))
    if (isAnswerValid && isNicknameValid && isEmailValid && validateEmail(email)) {
      console.log('New answer submitted successfully');
      addAnswer(questionID, answer, nickname, email)
        .then(() => {
          alert('Answer submitted!');
          setAnswer('');
          setNickname('');
          setEmail('');
          setIsAnswerValid(false);
          setIsNicknameValid(false);
          setIsEmailValid(false);
          setIsWarningVisible(false);
          const answerModal = answerModalRef.current;
          if (answerModal) {
            answerModal.close();
          }
        })
        .catch(error => {
          console.error('Error submitting question:', error);
        });
    } else {
      alert('Missing or invalid information')
      setIsWarningVisible(true);
    }
  };

  const handleClose = () => {
    const answerModal = answerModalRef.current;
    if (answerModal) {
      answerModal.close();
      setAnswer('');
      setNickname('');
      setEmail('');
      setIsAnswerValid(false);
      setIsNicknameValid(false);
      setIsEmailValid(false);
      setIsWarningVisible(false);
    }
  };

  return (
    <div>
      <h4><b>Q: {question.question_body}</b></h4>
      <p>
        <small>
          Helpful? <button onClick={handleClick} style={{ textDecorationLine: 'underline' }}>Yes ({helpfulness})</button> | <button style={{ textDecorationLine: 'underline', cursor: 'pointer' }} onClick={openAnswerModal}>Add Answer</button>
        </small>
      </p>
      <AnswerList answers={answers} />

      <div>
        <dialog id="answermodal" name="modal" ref={answerModalRef} style={{ width: '500px', textAlign: 'left' }}>
          <form onSubmit={handleSubmit} method="dialog" className="modal-box" style={{ width: '100%' }}>
            <div id="heading" style={{
              padding: '16px 0',
              minHeight: '56px',
              marginRight: '24px',
              lineHeight: '24px',
              fontSize: '16px',
              fontWeight: '700',
              textSizeAdjust: '100%'
            }}>
              <h1 className="font-bold text-lg">Submit your Answer</h1>
              <h2>[ProductName: ProductBody]</h2>
            </div>

            <div style={{ padding: '16px 0' }}>
              <div>
                <label htmlFor="answerInput">Your answer<span>*</span>
                  <input
                    id="answerInput"
                    name="answer"
                    rows="2"
                    style={{ width: '100%' }}
                    maxLength="1000"
                    value={answer}
                    placeholder="Example: The product is excellent!"
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setIsAnswerValid(e.target.value.trim().length > 0);
                    }}
                    required
                  />
                </label>
              </div>

              <div style={{ paddingTop: '25px' }}>
                <label htmlFor="nicknameInput">Your nickname<span>* </span>
                  <input
                    id="nicknameInput"
                    type="text"
                    name="nickname"
                    style={{ width: '100%' }}
                    maxLength="60"
                    rows="1"
                    placeholder="Example: jack543!"
                    value={nickname}
                    onChange={(e) => { setNickname(e.target.value); setIsNicknameValid(e.target.value.trim().length > 0) }}
                    required
                  />
                </label>
                <br />
                <small><em>For privacy reasons, do not use your full name or email address.</em></small>
              </div>

              <div style={{ paddingTop: '25px', paddingBottom: '15px' }}>
                <label htmlFor="emailInput">Your email<span>* </span>
                  <input
                    id="emailInput"
                    type="text"
                    name="email"
                    style={{ width: '100%' }}
                    maxLength="60"
                    rows="1"
                    placeholder="Example: jack@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setIsEmailValid(validateEmail(e.target.value)) }}
                    required
                  />
                </label>
                <br />
                <small><em>For authentication reasons, you will not be emailed.</em></small>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                disabled={uploadedPhotos.length >= 5}
              />

              <div className="thumbnails-container" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                {uploadedPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.src}
                    alt={photo.name}
                    className="thumbnail"
                  />
                ))}
              </div>

              <div>
                <button
                  className="btn"
                  type="submit"
                  style={{
                    textAlign: 'center',
                    lineHeight: '29px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Suxwbmit Answer
                </button>
                <button
                  className="btn"
                  style={{
                    textAlign: 'center',
                    lineHeight: '29px',
                    fontSize: '13px',
                    margin: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </dialog>

      </div>

      {isWarningVisible && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          You must enter the following correctly: {isAnswerValid ? '' : 'Answer, '}
          {isNicknameValid ? '' : 'Nickname, '}
          {isEmailValid ? '' : 'Email'}
        </p>
      )}


    </div>
  );
};

export default Question;
