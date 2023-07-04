import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import axiosAtelier from '../../../axiosAtelier.js';
import Card from './RelatedCard.jsx';
import '../Common/hideScrollbar.css';
import { LeftArrow, RightArrow } from '../Common/Arrow.jsx';
import { getProductDetails, dataMap, getImages, getReviews, getRelated } from '../Common/routes.js';
import createImageObjects from '../Common/CreateImageObjects.js'

export default function RelatedItems(ogProduct) {
  const [items, setItems] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  var stateToBeSet = [];


  React.useEffect(() => {
    function getRelatedProducts() {
      if (ogProduct.product.id) {
        getRelated(ogProduct.product.id).then((response) => {
          return Promise.all(response.map(getProductDetails));
        }).then((response) => {
          stateToBeSet = response;
          return response;
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
    }

     getRelatedProducts();
  }, [ogProduct]);
  if(items.length) {
  return (
    <ScrollMenu
     LeftArrow={<LeftArrow></LeftArrow>}
      RightArrow={<RightArrow></RightArrow>}
      options={{
        ratio: 0.9,
        rootMargin: "5px",
        threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
      }}
      >
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
          ogProduct={ogProduct.product}
        />
      ))}
    </ScrollMenu>
  );
}
}