import React from 'react'
import ReviewTile from './ReviewTile'

const ReviewsList = (props) => {
  const { reviews, refresh } = props

  const [displayCount, setDisplayCount] = React.useState(2)

  const hideButton = reviews.length <= displayCount

  const handleClick = ()=>{
    setDisplayCount(displayCount + 2)
  }

  return (
    <div className='grow'>
      <ol >
        {reviews.slice(0, displayCount).map((review, i)=>{
          return <ReviewTile
            review={review}
            key={review.review_id}
            refresh={refresh}
          />
        })}
      </ol>
      <button className='btn' onClick={handleClick} hidden={hideButton}>More Reviews</button>
    </div>
  )
}

export default ReviewsList