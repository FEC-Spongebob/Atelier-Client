  import React, { useState, useEffect, useRef } from 'react';
  import { addAnswer } from './routes.js';

  const AnswerModal = ({ questionId }) => {
    const [answer, setAnswer] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [isAnswerValid, setIsAnswerValid] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    //add state to validate photos
    const [isWarningVisible, setIsWarningVisible] = useState(false);
    const answerModalRef = useRef(null);

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

    const handlePhotoUpload = (e) => {
      const files = e.target.files;
      const updatedPhotos = [...uploadedPhotos];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (event) => {
          const photo = {
            src: event.target.result,
            name: file.name,
          };
          updatedPhotos.push(photo);
          setUploadedPhotos(updatedPhotos);
        };

        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isAnswerValid && isNicknameValid && isEmailValid) {
        console.log('New answer submitted successfully');
        addAnswer(questionId, answer, nickname, email)
          .then(() => {
            alert('Answer submitted!');
            answerModalRef.current.close();
            setAnswer('');
            setNickname('');
            setEmail('');
            setIsAnswerValid(false);
            setIsNicknameValid(false);
            setIsEmailValid(false);
            setIsWarningVisible(false);
            setUploadedPhotos([]);
          })
          .catch((error) => {
            console.error('Error submitting answer:', error);
          });
      } else {
        setIsWarningVisible(true);
      }
    };

    const handleClose = (e) => {
      const answerModal = answerModalRef.current;
      if (answerModal) {
        answerModal.close();
        setAnswer('');
        setNickname('');
        setEmail('');
      }
    };

    return (
      <div>
        <button
        onClick={openAnswerModal}
        style={{ textAlign: 'center', lineHeight: '29px', cursor: 'pointer', textDecorationLine: 'underline'  }}
      > Add Answer
      </button>
        <dialog id="answermodal" name="modal" ref={answerModalRef} style={{ width: '500px', textAlign: 'left' }}>
          <form onSubmit={handleSubmit} method="dialog" className="modal-box" style={{ width: '100%', padding: '16px' }}>
            <div id="heading" style={{ padding: '16px 0', minHeight: '56px', marginRight: '24px', lineHeight: '24px', fontSize: '16px', fontWeight: '700', textSizeAdjust: '100%' }}>
              <h2 className="font-bold text-lg" style={{ marginBottom: '16px' }}>Submit Your Answer</h2>
              <h3>[productName]: [ProductBody here]</h3>
            </div>
            <div style={{ padding: '16px 0' }}>
              <div>
                <label htmlFor="answerInput">Your answer<span>*</span></label>
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
              </div>

              <div style={{ paddingTop: '25px' }}>
                <label htmlFor="nicknameInput">Your nickname<span>*</span></label>
                <input
                  id="nicknameInput"
                  type="text"
                  name="nickname"
                  style={{ width: '100%' }}
                  maxLength="60"
                  rows="1"
                  placeholder="Example: jack543!"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setIsNicknameValid(e.target.value.trim().length > 0);
                  }}
                  required
                />
                <br />
                <small><em>For privacy reasons, do not use your full name or email address.</em></small>
              </div>

              <div style={{ paddingTop: '25px', paddingBottom: '15px' }}>
                <label htmlFor="emailInput">Your email<span>*</span></label>
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
                <br />
                <small><em>For authentication reasons, you will not be emailed.</em></small>
              </div>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  disabled={uploadedPhotos.length >= 5}
                />
                <div className="thumbnails-container" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {uploadedPhotos.map((photo, index) => (
                    <img key={index} src={photo.src} alt={photo.name} className="thumbnail" />
                  ))}
                </div>
              </div>

              <div>
                <button className="btn" type="submit" style={{ textAlign: 'center', lineHeight: '29px', fontSize: '13px', cursor: 'pointer' }}>
                  Submit Answer
                </button>
                <button className="btn" style={{ textAlign: 'center', lineHeight: '29px', fontSize: '13px', margin: '10px', cursor: 'pointer' }} onClick={handleClose}>
                  Close
                </button>
              </div>

              {isWarningVisible && (
                <p style={{ color: 'red', fontSize: '12px' }}>
                  You must enter the following correctly: {isAnswerValid ? '' : 'Answer, '}
                  {isNicknameValid ? '' : 'Nickname, '}
                  {isEmailValid ? '' : 'Email'}
                </p>
              )}
            </div>
          </form>
        </dialog>
      </div>
    );
  };

  export default AnswerModal;
