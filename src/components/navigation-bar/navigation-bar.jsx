import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import './navigation-bar.css'
import {PopupContext} from "../../context/popup/popup";
import PopUp from "../pop-up/pop-up";
import {CheckoutContext} from "../../context/checkout/checkout";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import {useDispatch, useSelector} from "react-redux";
import {getProfileOpened} from "../../store/profile/profile-selectors";
import ProfileDropdown from "../profile-dropdown/profile-dropdown";
import NavigationBarExtension from "../navigation-bar-extension/navigation-bar-extension";
import {setNavigationOpened} from "../../store/navigation/navigation-actions";
import {getNavigationOpened} from "../../store/navigation/navigation-selectors";
import Blur from "../blur/blur";
import logoIMG from '../../utils/imgs/LogoIMG.png'
import cartSVG from "../../utils/imgs/CartSVG.svg";

const NavigationBar = () => {

    const dispatch = useDispatch()
    const profileState = useSelector(getProfileOpened)
    const {popUpText, poppedUp, popUpType} = useContext(PopupContext)
    const {cartOpened, setCartOpened} = useContext(CheckoutContext)
    const navigationOpened = useSelector(getNavigationOpened)
    const {items} = useContext(CheckoutContext)


    const openCloseNavigation = () => navigationOpened ? dispatch(setNavigationOpened(false)) : dispatch(setNavigationOpened(true))

    const openCloseCart = () => cartOpened ? setCartOpened(false) : setCartOpened(true)


    return (
        <div className='body-container'>

            <div className="custom-shape-divider-top-1663860861">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>


            {
                profileState ? <ProfileDropdown /> : null
            }

            <div className='navigation'>
                {navigationOpened ? <div><Blur /><NavigationBarExtension /></div> : <div className='menu-icon'><i onClick={openCloseNavigation} className="fa fa-3x fa-solid fa-bars"></i></div>}
                <Link className='logo-img' to='/'><img src={logoIMG} alt=""/></Link>
                <div className='cart-icon' onClick={openCloseCart}><img src={cartSVG} alt=""/><span className='navigation-icon'>{items.length}</span></div>

            </div>
            {cartOpened ? <CartDropdown /> : null}
            {poppedUp ? popUpType === 'error' ? <PopUp text={popUpText} color='fail'/> : <PopUp text={popUpText} color='success'/> : null}
            <Outlet />
        </div>

    )
}
export default NavigationBar