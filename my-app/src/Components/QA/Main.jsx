import React, { useState } from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import App from '../../App.js';
import FakeData from './FakeData.js'
//npm install react-modal


// NOTE: You'll need at least a product id from the parent component
// if that isn't ready yet, you can use a default value in your deconstructed props: { productId = 37314 }
const Main = () => {

// NOTE: FakeData is question data, not product data. Consider renaming for clarity
// then, move this question data's state and axios call to Search
// instead, your Main QnA component should only need to keep track of a different state variable
// that represents the treated listed of question data.
const [productInfo, setProductInfo] = useState(FakeData)

  return (
    <>
      <h3>QUESTIONS & ANSWERS</h3>
      {/* NOTE: Search needs to make sure question data is filtered/sorted/etc.
          You can pass question data down from the main component, but in this case,
          it may be simpler to GET the raw question data inside of Search, filter it, sort it,
          and set the state for the treated question data in this component.
          So, you can get by with passing as props the product id and
          a setter function for the treated question data state variable.
      */}
      <Search questions={productInfo} />
      {/* NOTE: If Search does all the heavy lifting, then QuestionList only has to render out
          the list of treated question data from the state in this Main component.
      */}
      <QuestionList questions={productInfo} />
      {/* TODO: make this button bring up a form modal, add data validation to the form, and send a POST on submission
      */}
      <button>Add a Question +</button>
    </>
  );
}

export default Main;
