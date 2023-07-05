import serverIO from './serverIO'

const ReviewTile = (props) => {
  const { review, refresh } = props

  const name = review.reviewer_name
  const id = review.review_id
  const { rating, date, summary, body, helpfulness } = review

  const handleVote = ()=>{
    serverIO.castVote(id)
    .then(()=>{
      refresh()
    })
    .catch((err)=>{
      console.error(err.message)
    })
  }

  return (
    <div data-testid='review'>
      <div data-testid='stars'>{rating} Stars</div>
      <div>{name} {date}</div>
      <h3>{summary}</h3>
      <p>{body}</p>
      <div>Was this review helpful?
        <button onClick={handleVote}>
          {`Yes (${helpfulness})`}
        </button>
      </div>
    </div>
  )
}

export default ReviewTile