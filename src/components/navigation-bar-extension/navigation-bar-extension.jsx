import './navigation-bar-extension.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProfileOpened, getUser} from "../../store/profile/profile-selectors";
import {useContext} from "react";
import {CheckoutContext} from "../../context/checkout/checkout";
import {setProfileOpened} from "../../store/profile/profile-actions";
import {setNavigationOpened} from "../../store/navigation/navigation-actions";
import {getNavigationOpened} from "../../store/navigation/navigation-selectors";
import {timeToClose} from "../../store/navigation/navigation-reducer";
import userSVG from '../../utils/imgs/UserSVG.svg'
import questionSVG from '../../utils/imgs/QuestionSVG.svg'
import shopSVG from '../../utils/imgs/ShopSVG.svg'
import houseSVG from '../../utils/imgs/HouseSVG.svg'
import heartSVG from '../../utils/imgs/heartSVG.svg'
import cartSVG from '../../utils/imgs/CartSVG.svg'
import compassSVG from "../../utils/imgs/CompassSVG.svg";


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
                <li onClick={openCloseNavigation}><i className="menu-close-btn fa fa-3x fa-solid fa-circle-xmark"></i></li>
                <li><Link className='link-helper' to='/' >Home  <span className='navigation-icon'><img src={houseSVG} alt=""/></span></Link></li>
                <li><Link className='link-helper' to='/shop' >Shop<span className='navigation-icon'><img src={shopSVG}
                                                                                                         alt=""/></span></Link></li>
                <li><Link className='link-helper' to='/about' >About<span className='navigation-icon'><img src={questionSVG}
                                                                                                           alt=""/></span></Link></li>
                <li className='user-name' onClick={user ? openCloseProfile : null}><Link className='link-helper' to={user ? '' : '/auth'} >{user ? user.displayName : 'Authenticate'}<span className='navigation-icon'><img
                    src={userSVG} alt=""/></span></Link></li>
                {user ? <li><Link className='link-helper' to='/favourites' >Favourites<span className='navigation-icon'><img
                    src={heartSVG} alt=""/></span></Link></li> : null }
                <li onClick={openCloseCart}><img src={cartSVG} alt=""/><span className='navigation-icon'>{items.length}</span></li>
            </ul>
        </div>
    )
}
export default NavigationBarExtension