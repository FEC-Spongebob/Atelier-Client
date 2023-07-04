import React, { useRef } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

export default function ImageSlides({ smallImg, largeImg, itemId, setLoaded }) {
  const visibility = React.useContext(VisibilityContext);
  const modalRef = useRef(null);

  const showModal = () => {
    if (modalRef.current && largeImg !== null) {
      modalRef.current.showModal();
    }
  };

  const noImageSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" width="64px" height="64px">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" />
    </svg>
  );

  return (
    <div className="container" style={{ margin: '0 0px', width: '200px', height: '300px' }}>
      {smallImg ? (
        <img
          width="300px"
          height="449px"
          style={{ marginTop: '0px', width: '200px', height: '300px' }}
          src={smallImg}
          alt=""
          onClick={showModal}
        />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          {noImageSvg}
        </div>
      )}
      <dialog ref={modalRef} className="modal">
        <form method="dialog" className="modal-box">
          <img src={largeImg} alt="" />
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
