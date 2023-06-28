/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import SizeSelector from './SubComponents/SizeSelector.jsx'
import QuantitySelector from './SubComponents/QuantitySelector.jsx'
import CartButton from './SubComponents/CartButton.jsx'

const AddCart = ({style}) => {
  const [sizeSelect, setSizeSelect] = useState('')
  const [skuArray, setSkuArray] = useState([])
  const [quantitySelect, setQuantitySelect] = useState('')
  //style.skus is an object with all the skus nested
  //there is an ERROR in the camo onesie skus, there are two XL objects instead of one XL and a XXL obj
  //assume they are in order anyways from xs to XXL

  useEffect(() => {
    let skuArr = [];
    for (let sku in style.skus) {
      //makes a deep copy of skus
      skuArr.push({...style.skus[sku]});
    }
    //trying to correct the 6th entry to be XXL - can't do this way because this mutates the original array
    //react hates it when you mutate the original so I need to make a copy of my data and use that instead
    if (skuArr[5] && skuArr[5].size === 'XL') {
      skuArr[5].size = 'XXL'
    }
    setSkuArray(skuArr);
  }, [style]);

  const handleSize = (size) => {
    setSizeSelect(size)
  }
  const handleQuantity = (quantity) => {
    setQuantitySelect(quantity)
  }

  //sizes available depend on style, quantity depends on size selected

  return (
  <div>
    <SizeSelector size = {sizeSelect} changeSize={handleSize} skus ={skuArray}/>
    <QuantitySelector size = {sizeSelect} changeQuantity = {setQuantitySelect} skus ={skuArray} ></QuantitySelector>
    <CartButton size = {sizeSelect} quantity = {quantitySelect}></CartButton>
  </div>
  )
};

export default AddCart;

/*{ STYLE DATA BELOW
  "style_id": 220998,
  "name": "Forest Green & Black",
  "original_price": "140.00",
  "sale_price": null,
  "default?": true,
  "photos": [
    ...
  ],
  "skus": {
      "1281032": {
          "quantity": 8,
          "size": "XS"
      },
      "1281033": {
          "quantity": 16,
          "size": "S"
      },
      "1281034": {
          "quantity": 17,
          "size": "M"
      },
      "1281035": {
          "quantity": 10,
          "size": "L"
      },
      "1281036": {
          "quantity": 15,
          "size": "XL"
      },
      "1281037": {
          "quantity": 4,
          "size": "XL"
      }
  }
},*/