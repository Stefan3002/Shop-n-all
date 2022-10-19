import './item-card.css'
import Button from "../button/button";
import {useContext, useEffect} from "react";
import {CheckoutContext} from "../../context/checkout/checkout";
import {PopupContext} from "../../context/popup/popup";
import {FavouritesContext} from "../../context/favourites/favourites";
import {retrieveFavourites, updateDocument} from "../../utils/firebase/firebase";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "../../store/profile/profile-selectors";



const ItemCard = ({item, animationDelay}) => {
    const {items, setItems} = useContext(CheckoutContext)
    const {setPoppedUp, setPopUpText, setPopUpType} = useContext(PopupContext)
    let name, imageUrl, price, id
    if(item) {
        name = item.name
        imageUrl = item.imageUrl
        price = item.price
        id = item.id
    }
    const {setFavourites, favourites} = useContext(FavouritesContext)
    const user = useSelector(getUser)
    let starAverage = 1
    if(item)
         starAverage = item.starAverage

    useEffect(() => {
        (async () => {
            if(user)
                setFavourites(await retrieveFavourites(user))
        })()
    }, [user])

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
        <>
            {item ? <div className='item-container' style={{'animationDelay' : `${animationDelay}00ms`}}>
                <div className="divider">
                    <div className="custom-shape-divider-top-1663576759">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                             preserveAspectRatio="none">
                            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                        </svg>
                    </div>
                </div>
                <div className="main">
                    <Link to={`/shop/${item.category}/${id.toString()}`}>
                        <h2 className='item-name'>{name.slice(0,8)} {name.length > 8 ? '...' : null}</h2>
                        <img src={imageUrl} alt=""/>
                    </Link>
                    {/*<i className="fa fa-xl fa-solid fa-cart-plus"></i>*/}
                    <div className="bottom">
                        <Button text='Add to cart.' color='#dca536' clickHandler={addToCart}/>
                        {user && alreadyInFavourites() ? <i onClick={removeItemFromFavourites} className="fa fa-xl fa-solid fa-heart"></i> : <i onClick={addToFavourites} className="fa fa-xl fa-regular fa-heart"></i>}
                    </div>
                </div>

                <div className="utils">
                    <p className='item-price'><i className="fa fa-solid fa-coins"></i>{price}$</p>
                    {/*<p>{description ? description.slice(0,50) : null}</p>*/}
                    <div className="stars">
                        {starAverage >= 1 ? <i className="fa-solid fa-star"></i> : null}
                        {starAverage >= 2 ? <i className="fa-solid fa-star"></i> : null}
                        {starAverage >= 3 ? <i className="fa-solid fa-star"></i> : null}
                        {starAverage >= 4 ? <i className="fa-solid fa-star"></i> : null}
                        {starAverage >= 5 ? <i className="fa-solid fa-star"></i> : null}
                        <p>{starAverage} / 5</p>
                    </div>
                </div>

                <div className="divider">
                    <div className="custom-shape-divider-bottom-1663576949">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                             preserveAspectRatio="none">
                            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                        </svg>
                    </div>
                </div>

            </div> : null}
        </>

    )
}
export default ItemCard