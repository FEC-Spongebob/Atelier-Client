import ReviewsList from './ReviewsList'
import ReviewForm from './ReviewForm'
import { useState, useEffect } from 'react'
import serverIO from './serverIO'

const RatingsReviews = (props) => {
  const { productID } = props
  const [reviews, setReviews] = useState([])
  const [meta, setMeta] = useState([])

  useEffect(()=>{
    serverIO.getReviews(productID)
    .then((responseData)=>{
      setReviews(responseData)
    })
    .catch((err)=>{
      console.error(err.message)
    })

    serverIO.getMetadata(productID)
    .then((responseData)=>{
      setMeta(responseData)
    })
    .catch((err)=>{
      console.error(err.message)
    })
  }, [productID])

  const refresh = ()=>{
    serverIO.getReviews(productID)
    .then((responseData)=>{
      setReviews(responseData)
    })
    .catch((err)=>{
      console.error(err.message)
    })

    serverIO.getMetadata(productID)
    .then((responseData)=>{
      setMeta(responseData)
    })
    .catch((err)=>{
      console.error(err.message)
    })
  }

  return (
    <div>
      Customer Reviews
      <ReviewsList reviews={reviews} refresh={refresh}/>
      <ReviewForm meta={meta} productID={productID} />
    </div>
  )
}

export default RatingsReviews