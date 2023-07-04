import React, { useRef } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { Stars } from '../Common/Stars.jsx';
import { LeftArrow, RightArrow } from '../Common/ImageArrows.jsx';
import ImageSlides from '../Common/ImageSlides.jsx'
import '../Common/imageSlides.css';
import usePreventBodyScroll from '../Common/PreventBodyScroll.jsx';

export default function Card({ title, price, category, review, img, itemId, ogProduct, setOutfit, setOgInOutfit}) {
  const visibility = React.useContext(VisibilityContext);

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

  const loadedToTrue = () => {
    setLoaded(true);
  }

  const onClickSetOutfit = () => {
    if(itemId == ogProduct.id) {
      setOgInOutfit(false)
    }
    setOutfit((current) => {
      let newOutfit = current.filter((fruit) => fruit !== itemId)
      return [...newOutfit]
    }
    );
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
      onWheel={onWheel}
      onInit={loadedToTrue}
      apiRef={apiRef}
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
        <button className="btn btn-square btn-sm" style={{ position: 'absolute', top: '0.5%', left: '82.5%' }} onClick={onClickSetOutfit}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
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