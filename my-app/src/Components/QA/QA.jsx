import React, { useState } from 'react';
import Search from './Search/Search.jsx';
import QuestionList from './QuestionList/QuestionList.jsx';

const QA = ({ productId }) => {

   const [questionData, setQuestionData] = useState([]);
   const [filterData, setFilterData] = useState([]);

  return (
    <>
    <div class ="flex flex-col">
      <div class="flex flex-col w-full pr-[10%] pl-[10%] text-left">
      <h3><br /><br /><br /><b>QUESTIONS & ANSWERS</b></h3><br />
      </div>
      <div class="w-full">
        <Search setQuestionData={setQuestionData} questionData={questionData} filterData={filterData} setFilterData={setFilterData}/><br />
      </div>
      <div class="flex flex-col w-full pr-[10%] pl-[10%]">
        <QuestionList
          productId={productId}
          questionData={questionData}
          setQuestionData={setQuestionData}
          filterData={filterData}
        />
      </div>
    </div>
    <br /><br />
    </>
  );
};

export default QA;
