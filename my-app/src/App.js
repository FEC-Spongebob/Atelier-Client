import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import QA from './Components/QA/QA.jsx';
import Overview from './Components/Overview/Overview.jsx'
import RelatedCompare from './Components/RelatedComparison/RelatedComparison'
import RatingsReviews from './Components/RatingsReviews/RatingsReviews'

function App() {
  return (
    <div className="App">
      <Overview></Overview>
      <RelatedCompare></RelatedCompare>
      <QA productId={37315}></QA>
      <RatingsReviews productId={37311}></RatingsReviews>
    </div>
  );
}

export default App;
