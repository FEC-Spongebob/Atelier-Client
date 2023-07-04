import React, { useRef } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { Stars } from '../Common/Stars.jsx';
import { LeftArrow, RightArrow } from '../Common/ImageArrows.jsx';
import ImageSlides from '../Common/ImageSlides.jsx'
import '../Common/imageSlides.css';
import usePreventBodyScroll from '../Common/PreventBodyScroll.jsx';

export default function RelatedCard({ title, price, category, review, img, itemId, ogProduct, features }) {
  const visibility = React.useContext(VisibilityContext);
  const modalRef = useRef(null);
  const [currentStyle, setCurrentStyle] = React.useState(0);
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const [loaded, setLoaded] = React.useState(false);
  const apiRef = React.useRef({});


  React.useEffect(() => {
    function scrollToDefault() {
      function findDefault() {
        for (let idx = 0; idx < img.length; idx++) {
          if (img[idx].default) {
            return idx;
          }
        }
        return 0;
      }
      let defaultid = findDefault();
      apiRef.current.scrollToItem(
        apiRef.current.getItemById(defaultid),
        // OR if you not sure about id for first item
        // apiRef.current.getItemById(apiRef.current.items.toItems()[0]),
        "auto",
        "start"
      );
    }
    scrollToDefault();
  }, [loaded]);

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const loadedToTrue = () => {
    setLoaded(true);
  }

  const SalePrice = () => {
    if (img[currentStyle].sale_price) {
      return (
        <h4 className="card-actions justify-center"><s style={{ color: 'red' }}>${img[currentStyle].original_price}</s> ${img[currentStyle].sale_price}</h4>
      )
    } else {
      return (
        <h4 className="card-actions justify-center">${img[currentStyle].original_price}</h4>
      )
    }
    }

  return (
    <div
      className="card card-small w-96 bg-base-100 shadow-xl"
      style={{
        border: "2px solid",
        margin: "0 10px",
        width: "200px",
        height: "514px",
        overflow: "hidden"
      }}
    >
      <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
      <ScrollMenu
     LeftArrow={<LeftArrow setCurrentStyle={setCurrentStyle}></LeftArrow>}
      RightArrow={<RightArrow></RightArrow>}
      scrollContainerClassName='imgScrollContainer'
      itemClassName='imgScrollItem'
      separatorClassName='imgScrollSeparator'
      wrapperClassName='imgScrollWrapper'
      apiRef={apiRef}
      onInit={loadedToTrue}
      onWheel={onWheel}
      options={{
        ratio: 0.9,
        rootMargin: "5px",
        threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
      }}
      >
      {img.map(({ thumbnail_url, url }, index) => (
        <ImageSlides
          itemId={index} // NOTE: itemId is required for track items
          smallImg={thumbnail_url}
          largeImg={url}
          key={index}
        />
      ))}
    </ScrollMenu>
    </div>
        <div className="container">
        <button className="btn btn-square btn-sm" style={{ position: 'absolute', top: '0.5%', left: '82.5%' }} onClick={showModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/></svg>
        </button>
        <dialog ref={modalRef} className="modal">
          <form method="dialog" className="modal-box">
            <ModalContent ogFeatures={ogProduct.features} features={features} title={title} ogTitle={ogProduct.name}/>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="card-body"  style={{position:'absolute', top: '53.2%'}}>
        <h4 className="card-actions justify-center">{category}</h4>
        <div width="135px" height='56px' style={{ marginTop: "0px", width: '135px', height: '56px' }}>
          <h3 className='card-title justify-center'>{title}</h3>
        </div>
        <h4 className="card-actions justify-center">{img[currentStyle].name}</h4>
        <SalePrice></SalePrice>
        <div className="card-actions justify-center">
          <Stars review={review} />
        </div>
      </div>
    </div>
  );
}



function ModalContent({ogFeatures, features, title, ogTitle}) {
  let features1 = features.map(item => item.feature);
  let features2 = ogFeatures.map(item => item.feature);

  let mergedFeatures = [...new Set([...features1, ...features2])];

  return (
    <table className='table table-zebra'>
      <thead>
        <tr>
          <th>Feature</th>
          <th>{title}</th>
          <th>{ogTitle}</th>
        </tr>
      </thead>
      <tbody>
        {mergedFeatures.map((feature, index) => {
          let featuresValue = features.find(item => item.feature === feature)?.value || 'X';
          let ogFeaturesValue = ogFeatures.find(item => item.feature === feature)?.value || 'X';

          return (
            <tr key={index}>
              <td>{feature}</td>
              <td>{featuresValue}</td>
              <td>{ogFeaturesValue}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}