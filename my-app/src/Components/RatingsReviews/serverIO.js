import axios from '../../axiosAtelier'
import path from 'path-browserify'

const API = process.env.REACT_APP_API_BASE_URL

const serverIO = {
  getReviews: (productId) => {
    return axios({
      url: path.join(API, 'reviews'),
      method: 'GET',
      params: {
        product_id: productId
      }
    })
    .then((response)=>{
      return response.data.results
    })
    .catch((err)=>{
      console.log('CTRL: Error getting reviews')
      console.error(err.message)
      return []
    })
  },

  getMetadata: (productId) => {
    return axios({
      url: path.join(API, 'reviews', 'meta'),
      method: 'GET',
      params: {
        product_id: productId
      }
    })
    .then((response)=>{
      return response.data
    })
    .catch((err)=>{
      console.log('CTRL: Error getting metadata')
      console.error(err.message)
      return []
    })
  },

  castVote: (reviewId) => {
    console.log('PUT', path.join(API, 'reviews', reviewId.toString(), 'helpful'))
    return axios({
      url: path.join(API, 'reviews', reviewId.toString(), 'helpful'),
      method: 'PUT'
    })
    .catch((err)=>{
      console.log('CTRL: Error casting vote')
    })
  },

  reportReview: (reviewId) => {

    return Promise.resolve(null)
  },

  submitReview: (formData) => {

    return Promise.resolve(null)
  }
}

export default serverIO