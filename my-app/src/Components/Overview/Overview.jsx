/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import StyleSelect from './StyleSelect/StyleSelect.jsx';
import AddCart from './AddCart/AddCart.jsx';
import Gallery from './Gallery/Gallery.jsx';
import Search from './Search/Search.jsx'

import { fetchAllProducts, fetchProductData, fetchProductStyles, addProductToCart, getCart} from './ovRoutes'
import '../../styles/Overview.css'
// import Gallery from './Gallery';
// import StyleSelect from './StyleSelect';
// import AddCart from './AddCart';

const Overview = ({productID, setProductID}) => {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [styleID, setStyleID] = useState('');
  const [price, setPrice] = useState('');
  const [imageURLs, setImageURLs] = useState('')
  const [productList, setProductList] = useState([]);

  const handleStyle = (style) => {
    setStyleID(style);
    setPrice(style.sale_price ? style.sale_price : style.original_price)
    setImageURLs(style.photos)
  }


  useEffect(() => {
    Promise.all([
      fetchProductData(productID),
      fetchProductStyles(productID),
      fetchAllProducts()
    ])
      .then(([productData, styleData, allProducts]) => {
        setProduct(productData);
        setStyles(styleData.results);
        setProductList(allProducts)
        if (styleData.results.length > 0) {
          //default style should be first one
          handleStyle(styleData.results[0]);
        }

      })
      .catch((err) => {
        console.log('AXIOS error fetching product data', err);
      });
  }, []);

  useEffect(() => {
    Promise.all([
      fetchProductData(productID),
      fetchProductStyles(productID)
    ])
      .then(([productData, styleData]) => {
        setProduct(productData);
        setStyles(styleData.results);
        if (styleData.results.length > 0) {
          //default style should be first one
          handleStyle(styleData.results[0]);
        }


      })
      .catch((err) => {
        console.log('AXIOS error fetching product data', err);
      });
  }, [productID]);


  return (
  <div className = "Overview-container">
    <Search productList={productList} setProductID = {setProductID}></Search>
    <div className = "gallery-container">
    <Gallery photos = {imageURLs}></Gallery>
    </div>
    <div className="product-info-container">
    <ProductInfo style = {styleID} product = {product} productID = {productID} changeProduct = {setProductID} price={price}></ProductInfo>
    <StyleSelect styles = {styles} changeStyle={handleStyle}></StyleSelect>
    <AddCart style = {styleID} addCart={addProductToCart} getCart={getCart}></AddCart>
    </div>
  </div>
  )
};

export default Overview;