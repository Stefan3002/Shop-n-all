import './leave-review.css'
import Button from "../button/button";
import {addReviewToDocument} from "../../utils/firebase/firebase";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setReviews, setStarAverage} from "../../store/reviews/reviews-actions";
import {getUser} from "../../store/profile/profile-selectors";
const LeaveReview = ({productId, categoryTitle}) => {
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    let [stars, setStars] = useState(0)

    const oneStar = () => setStars(1)
    const twoStar = () => setStars(2)
    const threeStar = () => setStars(3)
    const fourStar = () => setStars(4)
    const fiveStar = () => setStars(5)

    const submitReviewHandler = async (event) => {
        event.preventDefault()
        const formField = event.target
        const reviewTitle = formField.reviewTitle.value
        const reviewBody = formField.reviewBody.value
        const returned = await addReviewToDocument(user,stars, reviewBody, reviewTitle, productId, categoryTitle)

        const {newReviews, starAverage} = returned
        dispatch(setReviews(newReviews))

        dispatch(setStarAverage(starAverage))
    }
    return (
        <div className='leave-review-container'>
            <h2>Write a review!</h2>
            {stars >= 1 ? <i onClick={oneStar} className="fa-solid fa-star"></i> : <i onClick={oneStar} className="fa-regular fa-star"></i>}
            {stars >= 2 ? <i onClick={twoStar} className="fa-solid fa-star"></i> : <i onClick={twoStar} className="fa-regular fa-star"></i>}
            {stars >= 3 ? <i onClick={threeStar} className="fa-solid fa-star"></i> : <i onClick={threeStar} className="fa-regular fa-star"></i>}
            {stars >= 4 ? <i onClick={fourStar} className="fa-solid fa-star"></i> : <i onClick={fourStar} className="fa-regular fa-star"></i>}
            {stars >= 5 ? <i onClick={fiveStar} className="fa-solid fa-star"></i> : <i onClick={fiveStar} className="fa-regular fa-star"></i>}
            <p>{stars} / 5</p>
            <form onSubmit={submitReviewHandler}>
                <input name='reviewTitle' type="text" placeholder='Title.' required/>
                <textarea name="reviewBody" id="" cols="30" rows="10" placeholder='Review.' required></textarea>
                <Button text='Submit review.' color='orange' />
            </form>
        </div>
    )
}
export default LeaveReview