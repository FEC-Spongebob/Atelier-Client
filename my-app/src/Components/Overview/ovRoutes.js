import axiosAtelier from '../../axiosAtelier.js'
const apiURL = process.env.REACT_APP_API_BASE_URL;
//PRODUCT INFOS
export const fetchAllProducts = async () => {
  try {
    console.log('API URL--- ',apiURL)

    const response = await axiosAtelier.get(`${apiURL}products`);
    return response.data
  } catch (err) {
    console.log ('FETCH ALL PRODUCT ERR-----', err)
    alert(err);
  }
}

export const fetchProductData = async (productID) => {
  try {
    const response = await axiosAtelier.get(`${apiURL}products/${productID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
};

export const fetchProductStyles = async (productId) => {
  try {
    const response = await axiosAtelier.get(`${apiURL}products/${productId}/styles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}
//REVIEW INFO
export const fetchProductReviewMetaData = async (productId) => {
  try {
    const response = await axiosAtelier.get(`${apiURL}reviews/meta?product_id=${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}
export const fetchProductReviews = async (productId) => {
  try {
    const response = await axiosAtelier.get(`${apiURL}reviews/?product_id=${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}

//CART INTERACTION

export const addProductToCart = async (sku_id, quantity) => {
  //currently the api does not have a method to input the quantity of the sku directly
  //just loop over how many times i need to add to the quantity
  //should I worry about stock levels?
  //sku_id is a BODY parameter
  try {
    const responses = [];
    //number of posts
    for (let i = 0; i < quantity; i++ ) {
      const response = await axiosAtelier.post(`${apiURL}cart`, {sku_id: sku_id});
      responses.push(response.data);
      console.log('response to AddProduct', response)
    }
    console.log('added product THIS MANY TIMES',responses)
    return responses;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}
export const getCart = async () => {

  try {
    const response = await axiosAtelier.get(`${apiURL}cart`)
    return response
  } catch (error) {
    console.error(`Error getting cart: `, error);
    throw error;
  }
}