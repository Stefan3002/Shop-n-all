import './checkout-item.css'
import {useContext} from "react";
import {PopupContext} from "../../context/popup/popup";
import moneySVG from '../../utils/imgs/MoneySVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {getCartItems} from "../../store/checkout/checkout-selectors.";
import {setCartItems} from "../../store/checkout/checkout-actions";

const CheckoutItem = ({data}) => {
    const {imageUrl, name, price} = data.item
    const {quantity} = data
    const {setPoppedUp, setPopUpText, setPopUpType} = useContext(PopupContext)
    const items = useSelector(getCartItems)
    const dispatch = useDispatch()

    const removeItemFromCart = () => {
        setPoppedUp(true)
        setPopUpText('Item removed from cart.')
        setPopUpType('success')
        setTimeout(() => {
            setPoppedUp(false)
        }, 2500)
        dispatch(setCartItems(items.filter((oldItem) => oldItem.item.id !== data.item.id)))
    }

    const increaseQuantity = () => {
        const foundItem = items.find((item) => item === data)
        foundItem.quantity++
        const newItems = [...items]
        dispatch(setCartItems(newItems))
    }


    const decreaseQuantity = () => {
        const foundItem = items.find((item) => item === data)
        foundItem.quantity--
        if(foundItem.quantity <= 0)
            removeItemFromCart()
        else
            dispatch(setCartItems([...items]))

    }

    return (
        <div className='checkout-item-container'>
            <img src={imageUrl} alt=""/>
            <div className="basic-info">
                <h2>{name}</h2>
                <p className='quantity-container'><img className='money-icon' src={moneySVG} alt=""/>{quantity} x {price} $ = {quantity * price}</p>
            </div>
            <div className="utils">
                <div className="quantity-utils">
                    <i onClick={decreaseQuantity} className="fa fa-2x fa-solid fa-circle-chevron-left"></i>
                    <p>{quantity}</p>
                    <i onClick={increaseQuantity} className="fa fa-2x fa-solid fa-circle-chevron-right"></i>
                </div>
                <span onClick={removeItemFromCart} className="x-mark"><i className="fa-2x fa-solid fa-xmark"></i></span>
            </div>
        </div>
    )
}
export default CheckoutItem