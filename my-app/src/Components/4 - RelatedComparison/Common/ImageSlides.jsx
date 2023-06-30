import React, { useRef } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

export default function ImageSlides({ smallImg, largeImg, itemId, setLoaded}) {
  const visibility = React.useContext(VisibilityContext);
  const modalRef = useRef(null);

  const showModal = () => {
    if (modalRef.current && largeImg !== null) {
      modalRef.current.showModal();
    }
  };

    return (
      <div className="container"
      style={{
        margin: "0 0px",
        width: "200px",
        height: "300px"
      }}
      >
      <img width='300px' height='449px' style={{ marginTop: "0px", width: '200px', height: '300px' }} src={smallImg} alt='' onClick={showModal} />
      <dialog ref={modalRef} className="modal">
          <form method="dialog" className="modal-box">
            <img src={largeImg} alt=''/>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </div>
  );
}
