import React, { useState } from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import App from '../../App.js';
import FakeData from './FakeData.js'
//npm install react-modal


const Main = () => {

const [productInfo, setProductInfo] = useState(FakeData)

console.log('test', productInfo)

  return (
    <>
      <h3>QUESTIONS & ANSWERS</h3>
      <Search questions={productInfo} />
      <QuestionList questions={productInfo} />
    </>
  );
}

export default Main;