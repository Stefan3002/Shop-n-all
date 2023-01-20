import {Link, Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import './navigation-bar.css'
import {PopupContext} from "../../context/popup/popup";
import PopUp from "../pop-up/pop-up";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import {useDispatch, useSelector} from "react-redux";
import {getProfileOpened, getUser} from "../../store/profile/profile-selectors";
import NavigationBarExtension from "../navigation-bar-extension/navigation-bar-extension";
import {setNavigationOpened} from "../../store/navigation/navigation-actions";
import {getNavigationOpened} from "../../store/navigation/navigation-selectors";
import logoIMG from '../../utils/imgs/LogoIMG.png'
import cartSVG from "../../utils/imgs/CartSVG.svg";
import userSVG from "../../utils/imgs/UserSVG.svg";
import {setProfileOpened} from "../../store/profile/profile-actions";
import {getCartItems, getCartOpened} from "../../store/checkout/checkout-selectors.";
import {setCartOpened} from "../../store/checkout/checkout-actions";

const NavigationBar = () => {
    const [userProfilePic, setUserProfilePic] = useState(userSVG)
    const user = useSelector(getUser)

    useEffect(() => {
        if(user) {
            setUserProfilePic(user.photoURL)
        }
    }, [user])

    const dispatch = useDispatch()
    const profileState = useSelector(getProfileOpened)
    const {popUpText, poppedUp, popUpType} = useContext(PopupContext)
    const cartOpened = useSelector(getCartOpened)
    const navigationOpened = useSelector(getNavigationOpened)
    const items = useSelector(getCartItems)


    const openNavigation = () => dispatch(setNavigationOpened(true))
    const closeNavigation = () => dispatch(setNavigationOpened(false))

    const openCloseCart = () => cartOpened ? dispatch(setCartOpened(false)) : dispatch(setCartOpened(true))
    const openCloseProfile = () => {
        closeNavigation()
        profileState ? dispatch(setProfileOpened(false)) : dispatch(setProfileOpened(true))
    }

    return (
        <div className='body-container'>
            <div className='navigation'>
                <div className="navigation-wrapper" onMouseEnter={openNavigation}>
                    {navigationOpened ? <NavigationBarExtension items={items} dispatch={dispatch} openCloseCart={openCloseCart} /> : null}
                    <i style={{color: `white`}} className="fa fa-3x fa-solid fa-bars"></i>
                    <Link className='logo-img' to='/'><img src={logoIMG} alt=""/></Link>
                    <div className="right-icons">
                        <div className='cart-icon' onClick={openCloseCart}><img src={cartSVG} alt=""/><span className='navigation-icon'>{items.length}</span></div>
                        <div className='user-icon' onClick={user ? openCloseProfile : null}><Link className='link-helper' to={user ? '' : '/auth'} ><span className='navigation-icon'><img
                            src={user ? userProfilePic : userSVG} alt=""/></span></Link></div>
                    </div>
                </div>
            </div>
            {cartOpened && <CartDropdown />}
            {poppedUp ? popUpType === 'error' ? <PopUp text={popUpText} color='fail'/> : <PopUp text={popUpText} color='success'/> : null}
            <Outlet />
        </div>

    )
}
export default NavigationBar