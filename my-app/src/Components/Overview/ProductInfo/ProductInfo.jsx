/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import StarRating from './SubComponents/StarRating.jsx'
import Share from './SubComponents/Share.jsx'
import { fetchProductReviewMetaData, fetchProductReviews} from '../ovRoutes.js'
const ProductInfo = ({product, changeProduct, productID, style, price}) => {
  const [ratings,setRatings] = useState({});
  const [reviewsCount,setReviewsCount] = useState({});

  useEffect(() => {
    Promise.all([
      fetchProductReviewMetaData(productID),
      fetchProductReviews(productID),
    ])
      .then(([reviewMetaData, reviews, productData]) => {
        setRatings(reviewMetaData);
        setReviewsCount(reviews.results.length);
      })
      .catch((err) => {
        console.log('AXIOS error fetching reviews meta data', err);
      });
  }, []);

  //check if sale price
  const salePrice = style.sale_price;
  return (
  <div className = "text-left mt-2%">
    {reviewsCount > 0 && <StarRating ratings = {ratings} reviewsCount={reviewsCount}></StarRating>}
    <div className="pt-2 uppercase" style={{fontSize: 'calc(12px + .6vw)'}}>{product.category}</div>
    <div className="font-semibold" style={{fontSize: 'calc(12px + 1.2vw)'}}>{product.name}</div>
    <div className="mt-2 mb-2" style={{fontSize: 'calc(12px + .8vw)'}}>
        {salePrice ? (
          <>
            <del className="text-gray-500">${style.original_price}</del> <span>On SALE! ${salePrice}</span>
          </>
        ) : (
          <>${price}</>
        )}
    </div>
    <div className="pr-5" style={{fontSize: 'calc(12px + .4vw)'}}>{product.description}</div>
    <Share></Share>

  </div>
  )
};

export default ProductInfo;

//TESTING FOR LATER -
//should not show reviews and stars if theres no reviews yet

//should show proper amount of stars filled and number of reviews, and be linked to reviews section

//should show proper product name,defaultstyle price, description (if exists), category