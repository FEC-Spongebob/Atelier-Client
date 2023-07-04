import React, { useRef } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { Stars } from '../Common/Stars.jsx';

export default function Card({ ogProduct, setOutfit, setOgInOutfit, ogInOutfit}) {
  const visibility = React.useContext(VisibilityContext);

  const handleClick = () => {
    if(ogInOutfit === false) {
  setOgInOutfit(true)
  setOutfit((current) => {
    return [ogProduct.id].concat(current)
  }
    );
  }
  };

  return (
    <div
      className="card card-small w-96 bg-base-100 shadow-xl"
      style={{
        border: "2px solid",
        margin: "60px 10px",
        width: "200px",
        height: "300px",
        overflow: "hidden"
      }}
    >
      <div>
        <button className="btn btn-circle" style={{ position:'relative', top: '100%' }} onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <div className="card-body">
        <h4 className="card-title justify-center">Add to Outfit</h4>
        </div>
      </div>
      </div>
  );
}