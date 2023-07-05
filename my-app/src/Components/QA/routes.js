import axiosAtelier from '../../axiosAtelier.js';
const apiURL = process.env.REACT_APP_API_BASE_URL;

// View questions
export function getAllQuestions(productId) {
  return axiosAtelier.get(`${apiURL}qa/questions?product_id=${productId}&count=1000`)
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

// Get Answer List
export function getAnswers(questionId) {
  return axiosAtelier.get(`${apiURL}qa/questions/${questionId}/answers`)
    .then(response => response.data.results)
    .catch(error => console.error('Error fetching answer list', error))
}

// Mark an answer as helpful
export function markAnswerAsHelpful(answer_id) {
  return axiosAtelier
    .put(`${apiURL}qa/answers/${answer_id}/helpful`)
    .then(() => {
      console.log('Answer helpfulness count incremeneted')
    })
    .catch(error => {
      console.error('Error marking answer as helpful:', error);
    });
}

// Mark q as helpful
export function markQuestionAsHelpful(question_id) {
  return axiosAtelier.put(`${apiURL}qa/questions/${question_id}/helpful`)
    .then(() => {
      console.log('Question helpfulness count incremeneted')
    })
    .catch(error => {
      console.error('Error marking question as helpful:', error);
    });
};

// Add a q
export function addQuestion(product_id, body, name, email) {
  const data = {
    body: body,
    name: name,
    email: email,
    product_id: product_id
  };
  return axiosAtelier.post(`${apiURL}qa/questions`, data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error submitting question:', error);
      throw error;
    });
}

// Get product name
export function getProductName(productId) {
  return axiosAtelier.get(`${apiURL}products/${productId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error submitting question:', error)
    });
}

// Add an answer
export function addAnswer(question_id, answer, name, email) {
  const data = {
    answer: answer,
    name: name,
    email: email,
    question_id: question_id
  }
  return axiosAtelier.post(`${apiURL}qa/questions/${question_id}/answers`, data)
    .then(response => response.data)
    .catch(error => {
    console.error('Error submitting answer:', error);
    throw error;
  })
};

 // Report an answer
 export function reportAnswer(answerId) {
  return axiosAtelier.put(`${apiURL}qa/answers/${answerId}/report`)
    .then(response => {
      console.log('response===', response)
   //   return response.data;
    })
    .catch(error => {
      console.error('Error reporting question:', error);
      throw error;
    });
}

 // Report a question
 export function reportQuestion(questionId) {
  return axiosAtelier.put(`${apiURL}qa/questions/${questionId}/report`)
    .then(response => {
      console.log('response===', response)
    })
    .catch(error => {
      console.error('Error reporting question:', error);
      throw error;
    });
}


