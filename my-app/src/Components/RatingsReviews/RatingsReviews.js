import ReviewsList from './ReviewsList'
import ReviewForm from './ReviewForm'
import RatingBreakdown from './RatingBreakdown'
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
<<<<<<< HEAD
      Customer Reviews
      <ReviewsList reviews={reviews} refresh={refresh}/>
      <ReviewForm meta={meta} productID={productID} />
=======
      <h2 className='text-xl font-semibold'>Customer Reviews</h2>
      <div className='flex flex-row'>
        <div className=' w-4/12'>
          <RatingBreakdown/>
          <ReviewForm meta={meta} productId={productId} />
        </div>
        <ReviewsList reviews={reviews} refresh={refresh}/>
      </div>
>>>>>>> 23e96dedd6b5e2d917a27f558955340f44155dc4
    </div>
  )
}

export default RatingsReviews