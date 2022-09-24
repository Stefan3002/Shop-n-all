import './product-info.css'
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import LeaveReview from "../leave-review/leave-review";
import Button from "../button/button";
import Description from "../description/description";
import ItemReview from "../item-review/item-review";
import {useDispatch, useSelector} from "react-redux";
import noUserImage from '../../utils/imgs/decide.svg'
import {getReviews, getStarAverage} from "../../store/reviews/reviews-selector";
import {setReviews, setStarAverage} from "../../store/reviews/reviews-actions";
import {ItemsContext} from "../../context/items/items";
import {PopupContext} from "../../context/popup/popup";
import {FavouritesContext} from "../../context/favourites/favourites";
import {updateDocument} from "../../utils/firebase/firebase";
import {getUser} from "../../store/profile/profile-selectors";


const ProductInfo = ({itemsArray}) => {

        const {productId, categoryTitle} = useParams()
        const {items, setItems} = useContext(ItemsContext)
        const item = itemsArray.find((item) => item.id == productId)
        const {setPopUpText, setPoppedUp, setPopUpType} = useContext(PopupContext)
        const {name, imageUrl, price, description} = item
        const user = useSelector(getUser)
        const starAverage = useSelector(getStarAverage)
        const dispatch = useDispatch()

        const {setFavourites, favourites} = useContext(FavouritesContext)

    useEffect(() => {
        const reviews = item.reviews
        dispatch(setReviews(reviews))
        dispatch(setStarAverage(item.starAverage))
    }, [])

    const itemReviews = useSelector(getReviews)

    const addToCart = () => {
        setPoppedUp(true)
        setPopUpText('Item added successfully to cart.')
        setPopUpType('success')
        setTimeout(() => {
            setPoppedUp(false)
        }, 2500)

        const foundItem = items.find((oldItem) => oldItem.item.id == item.id)
        console.log(foundItem)
        if(foundItem) {
            const newItems = items.map((oldItem) => {
                if (oldItem.item.id == item.id)
                    return {...oldItem, quantity: oldItem.quantity + 1}
                else
                    return oldItem
            })
            setItems(newItems)
        }
        else
            setItems([...items, {item, quantity: 1}])

    }
    const addToFavourites = async () => {
        try {
            const newFavourites = [...favourites, item]
            setFavourites(newFavourites)
            await updateDocument('favourites', newFavourites, user)
            setPoppedUp(true)
            setPopUpText('Item added to favourites.')
            setPopUpType('success')
            setTimeout(() => {
                setPoppedUp(false)
            }, 2500)
        }catch(err){
            setPoppedUp(true)
            setPopUpText('An error occurred. Are you sure you are logged in?')
            setPopUpType('error')
            setTimeout(() => {
                setPoppedUp(false)
            }, 2500)
        }

    }
    const removeItemFromFavourites = async () => {
        const newFavourites = favourites.filter((oldItem) => oldItem.id !== item.id)
        setFavourites(newFavourites)
        await updateDocument('favourites', newFavourites, user)
        setPoppedUp(true)
        setPopUpText('Item removed from favourites.')
        setPopUpType('success')
        setTimeout(() => {
            setPoppedUp(false)
        }, 2500)
    }

    const alreadyInFavourites = () => {
        if(favourites)
            return favourites.find((favItem) => favItem.id === item.id)
    }

    return (
        <div className='product-info-container'>
            <div className='basic-info-container'>
                <div className="aside-left">
                    <img src={imageUrl} alt=""/>
                    <div className='aside'>
                        <h2 className='product-title'>{name}</h2>
                        <div className="stars">
                            {starAverage >= 1 ? <i className="fa-solid fa-star"></i> : null}
                            {starAverage >= 2 ? <i className="fa-solid fa-star"></i> : null}
                            {starAverage >= 3 ? <i className="fa-solid fa-star"></i> : null}
                            {starAverage >= 4 ? <i className="fa-solid fa-star"></i> : null}
                            {starAverage >= 5 ? <i className="fa-solid fa-star"></i> : null}
                            <p>{starAverage} / 5</p>
                        </div>
                        <p className='price'>{price}$</p>
                        <Button color='#dca536' clickHandler={addToCart} text='Add to cart.'/>
                        {user && alreadyInFavourites() ?
                            <i onClick={removeItemFromFavourites} className="fa fa-xl fa-solid fa-heart"></i> :
                            <i onClick={addToFavourites} className="fa fa-xl fa-regular fa-heart"></i>}
                    </div>
                </div>

                <Description text={description} />
            </div>

            {
                itemReviews ? <div className='reviews-container'>
                    {
                        itemReviews.map((itemReview) => {
                            return <ItemReview key={itemReview.reviewTitle} data={itemReview} />
                        })
                    }
                </div> : null
            }


            <div className="reviews">
                {user ? <LeaveReview productId={productId} categoryTitle={categoryTitle} /> : <div className='no-user-reviews'><p>To add a review, please log in.</p><img src={noUserImage} alt=""/></div>}
            </div>
        </div>
    )
}

export default ProductInfo