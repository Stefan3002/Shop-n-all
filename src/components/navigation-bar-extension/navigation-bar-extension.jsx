import './navigation-bar-extension.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProfileOpened, getUser} from "../../store/profile/profile-selectors";
import {useContext} from "react";
import {PopupContext} from "../../context/popup/popup";
import {CheckoutContext} from "../../context/checkout/checkout";
import {setProfileOpened} from "../../store/profile/profile-actions";
import {setNavigationOpened} from "../../store/navigation/navigation-actions";
import {getNavigationOpened} from "../../store/navigation/navigation-selectors";
import {timeToClose} from "../../store/navigation/navigation-reducer";
const NavigationBarExtension = () => {
    const dispatch = useDispatch()
    const profileState = useSelector(getProfileOpened)
    const {items, cartOpened, setCartOpened} = useContext(CheckoutContext)
    const user = useSelector(getUser)
    const navigationOpened = useSelector(getNavigationOpened)

    const openCloseNavigation = () => navigationOpened ? setTimeout(() => dispatch(setNavigationOpened(false)), timeToClose) : dispatch(setNavigationOpened(true))

    const openCloseCart = () => cartOpened ? setCartOpened(false) : setCartOpened(true)

    const openCloseProfile = () => profileState ? dispatch(setProfileOpened(false)) : dispatch(setProfileOpened(true))

    return (
        <div>
            <ul className='navigation-container'>
                <li onClick={openCloseNavigation}><i className="fa fa-3x fa-solid fa-compass"></i></li>
                <li><Link className='link-helper' to='/' >Home  <span className='navigation-icon'><i className="fa-xl fa-solid fa-house-chimney"></i></span></Link></li>
                <li><Link className='link-helper' to='/shop' >Shop<span className='navigation-icon'><i className=" fa-xl fa-solid fa-shop"></i></span></Link></li>
                <li><Link className='link-helper' to='/about' >About<span className='navigation-icon'><i
                    className=" fa-xl fa-solid fa-circle-question"></i></span></Link></li>
                <li className='user-name' onClick={user ? openCloseProfile : null}><Link className='link-helper' to={user ? '' : '/auth'} >{user ? user.displayName : 'Authenticate'}<span className='navigation-icon'><i
                    className=" fa-xl fa-solid fa-user"></i></span></Link></li>
                {user ? <li><Link className='link-helper' to='/favourites' >Favourites<span className='navigation-icon'><i
                    className="fa-xl fa-solid fa-shield-heart"></i></span></Link></li> : null }
                <li onClick={openCloseCart}><i
                    className="fa-xl fa-solid fa-cart-shopping"></i><span className='navigation-icon'>{items.length}</span></li>
            </ul>
        </div>
    )
}
export default NavigationBarExtension