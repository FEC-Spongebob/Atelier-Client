import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './styles/App.css';
import QA from './Components/QA/QA.jsx';
import Overview from './Components/Overview/Overview.jsx'
import RelatedCompare from './Components/RelatedComparison/RelatedComparison'
import RatingsReviews from './Components/RatingsReviews/RatingsReviews'

function App() {
  const [productID, setProductID] = useState('37311');

  return (
    <div className="App">
      <div>
<<<<<<< HEAD
        <Overview productID = {productID} setProductID={setProductID}></Overview>
      </div>
      <div className="centered">
        <RelatedCompare ></RelatedCompare>
      </div>
      <div className="centered">
        <QA productID = {productID}></QA>
      </div>
      <div className="centered">
        <RatingsReviews productID = {productID}></RatingsReviews>
=======
      <Overview productID = {productID} setProductID={setProductID}></Overview>
      </div>
      <div>
      <RelatedCompare ></RelatedCompare>
      </div>
      <div>
        <QA productID = {productID}></QA>
      </div>
      <div>
      <RatingsReviews productID = {productID}></RatingsReviews>
>>>>>>> e49c173... feat: searchbar
      </div>
    </div>
  );
}

export default App;
