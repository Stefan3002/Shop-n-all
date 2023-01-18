import './cart-dropdown.css'
import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item";
import {useContext} from "react";
import {CheckoutContext, getCartTotal} from "../../context/checkout/checkout";
import Button from "../button/button";
import {Link, useNavigate} from "react-router-dom";
import questionMark from '../../utils/imgs/question.svg'
import {setNavigationOpened} from "../../store/navigation/navigation-actions";
import {useDispatch} from "react-redux";
const CartDropdown = () => {
    const {items,cartOpened, setCartOpened} = useContext(CheckoutContext)
    const openCloseCart = () => {
        cartOpened ? setCartOpened(false) : setCartOpened(true)
    }
    const dispatch = useDispatch()
    const redirect = useNavigate()
    const redirectToCheckout = () => {
        setCartOpened(false)
        dispatch(setNavigationOpened(false))

    }

    return (
        <div className='cart-dropdown-container'>
            <span onClick={openCloseCart} className="close-btn"><i className="fa-3x fa-solid fa-circle-xmark"></i></span>
            <span className="total">Total: {getCartTotal(items)}</span>
            {items.map((item) => {
                return <CartDropdownItem key={item.id} data={item} />
        })}
            {!items.length ? <div><p>Nothing to see here.</p> <img className='no-items-img' src={questionMark} alt=""/></div> : <Link to='/checkout' onClick={redirectToCheckout}><Button color='#dca536' text='Checkout.' /></Link>}
        </div>
    )
}
export default CartDropdown