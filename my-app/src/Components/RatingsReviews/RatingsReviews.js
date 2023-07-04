import ReviewsList from './ReviewsList'
import ReviewForm from './ReviewForm'
import { useState, useEffect } from 'react'
import serverIO from './serverIO'

const RatingsReviews = (props) => {
  const { productId } = props
  const [reviews, setReviews] = useState([])
  const [meta, setMeta] = useState([])

  useEffect(()=>{
    serverIO.getReviews(productId)
    .then((responseData)=>{
      setReviews(responseData)
    })
    .catch((err)=>{
      console.error(err.message)
    })

    serverIO.getMetadata(productId)
    .then((responseData)=>{
      setMeta(responseData)
    })
    .catch((err)=>{
      console.error(err.message)
    })
  }, [productId])

  const refresh = ()=>{
    serverIO.getReviews(productId)
    .then((responseData)=>{
      setReviews(responseData)
    })
    .catch((err)=>{
      console.error(err.message)
    })

    serverIO.getMetadata(productId)
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
      <ReviewForm meta={meta} productId={productId} />
    </div>
  )
}

export default RatingsReviews