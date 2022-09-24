import './cart-dropdown-item.css'
import {useContext} from "react";
import {CheckoutContext} from "../../context/checkout/checkout";
import {PopupContext} from "../../context/popup/popup";
const CartDropdownItem = ({data}) => {
    const {name, price, imageUrl} = data.item
    const {quantity} = data
    const {setPoppedUp, setPopUpText, setPopUpType} = useContext(PopupContext)
    const {items, setItems} = useContext(CheckoutContext)
    const removeItemFromCart = () => {
        setPoppedUp(true)
        setPopUpText('Item removed from cart.')
        setPopUpType('success')
        setTimeout(() => {
            setPoppedUp(false)
        }, 2500)
        setItems(items.filter((oldItem) => oldItem.item.id !== data.item.id))
    }


    return (
        <div className='cart-dropdown-item-container'>
            <img src={imageUrl} alt=""/>
            <div className="text-container">
                <h2 className='name'>{name}</h2>
                <p className='price'>{quantity} x {price} $</p>
            </div>
            <span onClick={removeItemFromCart} className="x-mark"><i className="fa fa-xl fa-solid fa-xmark"></i></span>
        </div>
    )
}
export default CartDropdownItem