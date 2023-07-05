// import React, { useState, useEffect, useRef } from 'react';

// const AnswerModal = ({ questionID, productName, addAnswer }) => {
//   const [answer, setAnswer] = useState('');
//   const [nickname, setNickname] = useState('');
//   const [email, setEmail] = useState('');
//   const [uploadedPhotos, setUploadedPhotos] = useState([]);

//   const [isNicknameValid, setIsNicknameValid] = useState(false);
//   const [isAnswerValid, setIsAnswerValid] = useState(false);
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const [isWarningVisible, setIsWarningVisible] = useState(false);

//   const answerModalRef = useRef(null);

//   const showModal = () => {
//     const answerModal = answerModalRef.current;
//     if (answerModal) {
//       answerModal.showModal();
//     }
//   };

//   const closeModal = () => {
//     const answerModal = answerModalRef.current;
//     if (answerModal) {
//       answerModal.close();
//     }
//   };

//   const handleClose = () => {
//     closeModal();
//     setAnswer('');
//     setNickname('');
//     setEmail('');
//     setIsAnswerValid(false);
//     setIsNicknameValid(false);
//     setIsEmailValid(false);
//     setIsWarningVisible(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isAnswerValid && isNicknameValid && isEmailValid) {
//       console.log('New answer submitted successfully');
//       addAnswer(questionID, answer, nickname, email)
//         .then(() => {
//           alert('Answer submitted!');
//           setAnswer('');
//           setNickname('');
//           setEmail('');
//           setIsAnswerValid(false);
//           setIsNicknameValid(false);
//           setIsEmailValid(false);
//           setIsWarningVisible(false);
//           setUploadedPhotos([]);
//           closeModal();
//         })
//         .catch(error => {
//           console.error('Error submitting answer:', error);
//         });
//     } else {
//       alert('Missing or invalid information');
//       setIsWarningVisible(true);
//     }
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /\S+@\S+\.\S+/;
//     return emailRegex.test(email);
//   };

//   const handlePhotoUpload = (e) => {
//     const files = e.target.files;
//     const updatedPhotos = [...uploadedPhotos];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         const photo = {
//           src: event.target.result,
//           name: file.name,
//         };
//         updatedPhotos.push(photo);
//         setUploadedPhotos(updatedPhotos);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     const answerModal = answerModalRef.current;
//     if (answerModal) {
//       answerModal.addEventListener('close', handleClose);
//     }
//     return () => {
//       if (answerModal) {
//         answerModal.removeEventListener('close', handleClose);
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <dialog id="answermodal" name="modal" ref={answerModalRef} style={{ width: '500px', textAlign: 'left' }}>
//         <form onSubmit={handleSubmit} method="dialog" className="modal-box" style={{ width: '100%', padding: '16px' }}>
//           <h2 style={{ marginBottom: '16px' }}>Submit Your Answer</h2>

//           {isWarningVisible && (
//             <p style={{ color: 'red' }}>Please fill out all the required fields.</p>
//           )}

//           <div style={{ padding: '16px 0' }}>
//             <textarea
//               placeholder="Your Answer"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               onBlur={() => setIsAnswerValid(!!answer)}
//               required
//             />
//           </div>

//           <div style={{ padding: '16px 0' }}>
//             <input
//               type="text"
//               placeholder="Nickname"
//               value={nickname}
//               onChange={(e) => setNickname(e.target.value)}
//               onBlur={() => setIsNicknameValid(!!nickname)}
//               required
//             />
//           </div>

//           <div style={{ padding: '16px 0' }}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onBlur={() => setIsEmailValid(validateEmail(email))}
//               required
//             />
//           </div>

//           <div style={{ padding: '16px 0' }}>
//             <input type="file" multiple onChange={handlePhotoUpload} />
//           </div>

//           <div style={{ padding: '16px 0' }}>
//             <button type="submit">Submit Answer</button>
//             <button type="button" onClick={handleClose}>Close</button>
//           </div>
//         </form>
//       </dialog>
//     </div>
//   );
// };

// export default AnswerModal;
