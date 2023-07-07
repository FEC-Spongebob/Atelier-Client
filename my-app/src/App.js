import React, {useState, useEffect} from 'react';
import { themeChange } from 'theme-change'
import logo from './logo.svg';
import './styles/App.css';
import QA from './Components/QA/QA.jsx';
import Overview from './Components/Overview/Overview.jsx'
import RelatedCompare from './Components/RelatedComparison/RelatedComparison'
import RatingsReviews from './Components/RatingsReviews/RatingsReviews'



function App() {
  const [productID, setProductID] = useState('37311');

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
  <div>
    <div>
      <div style={{position:"absolute", top:'1%', left:'1%'}}>
        <select data-choose-theme className='select select-secondary w-full max-w-xs'>
          <option value="dark240">Dark</option>
          <option value="light240">Light</option>
        </select>
      </div>
    </div>
    <div>
      <div>
        <div>
          <Overview productID = {productID} setProductID={setProductID}></Overview>
        </div>
        <div>
          <RelatedCompare productid={productID} setProductID={setProductID} ></RelatedCompare>
        </div>
        <div className="centered">
          <QA productID = {productID}></QA>
        </div>
        <div id="reviews-section">
          <RatingsReviews productID = {productID}></RatingsReviews>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
