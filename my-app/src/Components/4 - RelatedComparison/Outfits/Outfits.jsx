import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import Card from './OutfitCard.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx'
import '../Common/hideScrollbar.css';
import { LeftArrow, RightArrow } from '../Common/Arrow.jsx';
import { getProductDetails, dataMap, getImages, getReviews } from '../Common/routes.js';
import createImageObjects from '../Common/CreateImageObjects.js'

export default function Outfits( {ogProduct, outfit, setOutfit, ogInOutfit, setOgInOutfit} ) {
  const [items, setItems] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);


  var stateToBeSet = [];

  React.useEffect(() => {
    if(outfit !== undefined && ogProduct !== undefined) {
      if(outfit.includes(ogProduct.id)) {
        setOgInOutfit(true);
      }
    }
  }, [outfit, ogProduct])

  React.useEffect(() => {
    function getProducts() {
      Promise.all(outfit.map(getProductDetails)).then((newItems) => {
        stateToBeSet = newItems;
        return newItems;
      }).then((newItems) => {
        return Promise.all(newItems.map(getImages));
      }).then((dataStyles) => {
        let itemsWithImgs = [];
        for (let idx = 0; idx < dataStyles.length; idx++) {
          itemsWithImgs.push(stateToBeSet[idx]);
          itemsWithImgs[idx].img = createImageObjects(dataStyles[idx]);
        }
        return itemsWithImgs;
      }).then((newItems) => {
        return Promise.all(newItems.map(getReviews));
      }).then((dataReviews) => {
        let reviewsScores = dataReviews.map((el) => {
          let totalTimed = +el.ratings['1'] + (+el.ratings['2'] * 2) + (+el.ratings['3'] * 3) + (+el.ratings['4'] * 4) + (+el.ratings['5'] * 5);
          let total = +el.ratings['1'] + +el.ratings['2'] + +el.ratings['3'] + +el.ratings['4'] + +el.ratings['5'];
          let final = totalTimed / total;
          return final;
        });
        let itemsWithReviewScores = [];
        for (let idx = 0; idx < reviewsScores.length; idx++) {
          itemsWithReviewScores.push(stateToBeSet[idx]);
          itemsWithReviewScores[idx].review = reviewsScores[idx];
        }
        setItems(itemsWithReviewScores);
        return itemsWithReviewScores;
      });
    }
    getProducts();
  }, [outfit]);

  return (
    <ScrollMenu
     LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      options={{
        ratio: 0.9,
        rootMargin: "5px",
        threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
      }}
      >
        <AddToOutfitCard
         ogProduct={ogProduct}
         setOutfit={setOutfit}
         setOgInOutfit={setOgInOutfit}
         ogInOutfit={ogInOutfit}
         />
      {items.map(({ id, name, default_price, category, review, img, features }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          img={img}
          review={review}
          category={category}
          title={name}
          price={default_price}
          key={id}
          features={features}
          ogProduct={ogProduct}
          setOutfit={setOutfit}
          ogInOutfit={ogInOutfit}
          setOgInOutfit={setOgInOutfit}
        />
      ))}
    </ScrollMenu>
  );
}