import React, { useState } from 'react';

//props = { productId, setFilteredQuestions }
const Search = ({ questions }) => {
  //NOTE: add a state variable for raw question data from api
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]); // NOTE: this should live in Main QnA component

  /*
  NOTE: inside of a useEffect that depends on changes to
  product id, make an axios call to qa/questions and set the
  raw questions data state variable to the data in the response
  */

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    //NOTE: end handleChange function here.
    //Factor this filtering logic out into a useEffect
    //that depends on changes to searchTerm
    //TODO: after filtering, sort the data too
    if (value.length >= 3) {
      const filteredQuestions = questions.filter((question) =>
        question.question_body.toLowerCase().includes(value.toLowerCase())
      );
      //NOTE: set the filtered questions from parent component instead
      setResults(filteredQuestions);
    } else {
      setResults([]);
    }
  };

  //rank results using sort

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
      {/* NOTE: QuestionList should render the list of data, not Search
      */}
      {results.map((question) => (
        <div key={question.question_id}>{question.question_body}</div>
      ))}
    </form>
  );
};

export default Search;
