import React, { useState, useEffect } from 'react';

const Search = ({ setQuestionData, questionData }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.length >= 3) {
      const filteredQuestions = questionData.filter((question) =>
        question.question_body.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setQuestionData(filteredQuestions);
    } else {
      setQuestionData(questionData);
    }
  };

  const style = {
    width: '80%',
    padding: '8px',
    boxSizing: 'border-box',
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Have a question? Search for answers…"
        value={searchTerm}
        onChange={handleChange}
        style={style}
      />
    </form>
  );
};

export default Search;
