import './cart-dropdown.css'
import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item";
import {useContext} from "react";
import {CheckoutContext, getCartTotal} from "../../context/checkout/checkout";
import Button from "../button/button";
import {Link} from "react-router-dom";
import questionMark from '../../utils/imgs/question.svg'
const CartDropdown = () => {
    const {items,cartOpened, setCartOpened} = useContext(CheckoutContext)
    const openCloseCart = () => {
        cartOpened ? setCartOpened(false) : setCartOpened(true)
    }

    return (
        <div className='cart-dropdown-container'>
            <span onClick={openCloseCart} className="close-btn"><i className="fa-3x fa-solid fa-circle-xmark"></i></span>
            <span className="total">Total: {getCartTotal(items)}</span>
            {items.map((item) => {
                return <CartDropdownItem key={item.id} data={item} />
        })}
            {!items.length ? <div><p>Nothing to see here.</p> <img className='no-items-img' src={questionMark} alt=""/></div> : <Link to='/checkout' onClick={openCloseCart}><Button color='#dca536' text='Checkout.' /></Link>}
        </div>
    )
}
export default CartDropdown