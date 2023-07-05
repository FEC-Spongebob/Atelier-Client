import ReviewsList from './ReviewsList'
import ReviewForm from './ReviewForm'
import RatingBreakdown from './RatingBreakdown'
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
      <h2 className='text-xl font-semibold'>Customer Reviews</h2>
      <div className='flex flex-row'>
        <div className=' w-4/12'>
          <RatingBreakdown/>
          <ReviewForm meta={meta} productId={productId} />
        </div>
        <ReviewsList reviews={reviews} refresh={refresh}/>
      </div>
    </div>
  )
}

export default RatingsReviews