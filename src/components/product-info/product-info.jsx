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
import missingImg from '../../utils/imgs/question.svg'
import moneySVG from '../../utils/imgs/money-svgrepo-com.svg'
import packageSVG from '../../utils/imgs/package-svgrepo-com.svg'
import customerSVG from '../../utils/imgs/customer-service-help-svgrepo-com.svg'


const ProductInfo = ({itemsArray}) => {

        const {productId, categoryTitle} = useParams()
        const {items, setItems} = useContext(ItemsContext)
        let item = {}
        if(itemsArray)
            item = itemsArray.find((item) => item.id == productId)
        const {setPopUpText, setPoppedUp, setPopUpType} = useContext(PopupContext)
        const {name, imageUrl, price, description, characteristics} = item
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
                <div className="aside-content">
                    <Description text={description} />
                    <h2>Characteristics. </h2>
                    {characteristics ? Object.keys(characteristics).map((characteristic) => {
                        return <div>
                            <p>{characteristic[0].toUpperCase()}{characteristic.slice(1)} : {characteristics[characteristic]}</p>
                        </div>
                    }): <img src={missingImg} alt=""/>}
                </div>
            </div>
            <div className="benefits">
                <div className='benefit1 benefit'>
                    <div className='benefit-header'>
                        <img src={moneySVG} alt=""/>
                        <h2>30 days money back.</h2>
                    </div>
                    <p>On our website anything you buy and don't like or does not fit can be returned in 30 days and you will get your money back.</p>
                </div>
                <div className='benefit benefit2'>
                    <div className='benefit-header'>
                        <img src={packageSVG} alt=""/>
                        <h2>Open the package before you pay.</h2>
                    </div>
                    <p>You can always open the package before you pay the courier. Just ask him and he will be glad to help you.</p>
                </div>
                <div className='benefit benefit3'>
                    <div className='benefit-header'>
                        <img src={customerSVG} alt=""/>
                        <h2>Permanent customer support.</h2>
                    </div>
                    <p>You can call us anytime, any day and we will try our best to help you! You can find the customer support telephone number in the "contact" page.</p>
                </div>
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