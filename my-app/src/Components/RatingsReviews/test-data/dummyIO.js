import dummyReviews from './dummyReviews.json'
import dummyMeta from './dummyMeta.json'

const dummyIO = {
  fakeReviews: (productId) => {
    return Promise.resolve(dummyReviews.results.slice(0))
  },

  fakeVote: (reviewId) => {
    const review = dummyReviews.results.find((rev)=>{
      return rev.review_id === reviewId
    })
    review.helpfulness++
    return Promise.resolve(null)
  },

  fakeMeta: (productId) => {
    return Promise.resolve(Object.create(dummyMeta))
  },

  fakeReport: (reviewId) => {

  },

  fakeSubmit: (formData) => {

  }
}

export default dummyIO