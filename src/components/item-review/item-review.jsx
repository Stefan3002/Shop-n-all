import './item-review.css'
const ItemReview = ({data}) => {
    const {displayName, reviewBody, reviewTitle, stars} = data
    return (
        <div className='item-review-container'>
            <h2 className='display-name'>{displayName} <span className='thin-text'>says:</span></h2>
            {stars >= 1 ? <i className="fa-solid fa-star"></i> : null}
            {stars >= 2 ? <i className="fa-solid fa-star"></i> : null}
            {stars >= 3 ? <i className="fa-solid fa-star"></i> : null}
            {stars >= 4 ? <i className="fa-solid fa-star"></i> : null}
            {stars >= 5 ? <i className="fa-solid fa-star"></i> : null}

            {/*<p className='date'>{addedAt.toString()}</p>*/}
            <h3 className='review-title'>{reviewTitle}</h3>
            <p className='review-body'>{reviewBody}</p>
        </div>
    )
}
export default ItemReview