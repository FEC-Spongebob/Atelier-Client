import React, {useState, useEffect} from "react"
import RelatedItems from './Related/RelatedItems.jsx'
import Outfits from './Outfits/Outfits.jsx'
import axiosAtelier from '../../axiosAtelier.js';

const ORList = () => {

const [outfit, setOutfit] = useState([]);
const [product, setProduct] = useState([]);
const [outfitAdded, setOutfitAdded] = useState(false);

const getOutfit = () => {
  setOutfit(['37312', '37314'])
}

const getProduct = () => {
  axiosAtelier.get(process.env.REACT_APP_API_BASE_URL + "products/" + '37311').then((response) => {
    setProduct(response.data)
  })
  }

  React.useEffect(() => {
    getOutfit();
    getProduct();
  }, []);


return (
  <div>
    <h2>Related Items</h2>
    <RelatedItems product={product}></RelatedItems>
    <h2>Hello Outfits</h2>
    <Outfits product={product} outfit={outfit} setOutfit={setOutfit} outfitAdded={outfitAdded} setOutfitAdded={setOutfitAdded}></Outfits>

  </div>
)
}

export default ORList;