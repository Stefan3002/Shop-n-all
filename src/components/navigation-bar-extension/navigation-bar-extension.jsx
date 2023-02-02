import './navigation-bar-extension.css'
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "../../store/profile/profile-selectors";
import {useEffect, useState} from "react";
import {setNavigationOpened} from "../../store/navigation/navigation-actions";
import {getNavigationOpened} from "../../store/navigation/navigation-selectors";
import {timeToClose} from "../../store/navigation/navigation-reducer";
import userSVG from '../../utils/imgs/UserSVG.svg'
import questionSVG from '../../utils/imgs/QuestionSVG.svg'
import shopSVG from '../../utils/imgs/ShopSVG.svg'
import houseSVG from '../../utils/imgs/HouseSVG.svg'
import heartSVG from '../../utils/imgs/heartSVG.svg'
import logo from '../../utils/imgs/LogoIMG.png'
import cartSVG from "../../utils/imgs/CartSVG.svg";


const NavigationBarExtension = ({items, openCloseCart, dispatch}) => {
    const user = useSelector(getUser)
    const navigationOpened = useSelector(getNavigationOpened)

    const [userProfilePic, setUserProfilePic] = useState(userSVG)


    useEffect(() => {
        if(user) {
            setUserProfilePic(user.photoURL)
        }
    }, [user])


    const openCloseNavigation = () => navigationOpened ? setTimeout(() => dispatch(setNavigationOpened(false)), timeToClose) : dispatch(setNavigationOpened(true))

    const redirect = useNavigate()
    const redirectToProfile = () => {
        dispatch(setNavigationOpened(false))
        if(user)
            redirect('/profile')
        else
            redirect('/auth')
    }
    const redirectHome = () => {
        dispatch(setNavigationOpened(false))
        redirect('/')
    }

    return (
        <div className='navigation-extended'>
            <div className="top-section" onClick={redirectHome}>
                {/*<h1>Shop-n-All</h1>*/}
                <img src={logo} alt=""/>
            </div>
            <ul className='navigation-container'>
                <li onClick={openCloseNavigation}><Link className='link-helper' to='/' ><p>Home</p>  <span className='navigation-icon'><img src={houseSVG} alt=""/></span></Link></li>
                <li onClick={openCloseNavigation}><Link className='link-helper' to='/shop' ><p>Shop</p><span className='navigation-icon'><img src={shopSVG} alt=""/></span></Link></li>
                <li onClick={openCloseNavigation}><Link className='link-helper' to='/about' ><p>About</p><span className='navigation-icon'><img src={questionSVG}
                                                                                                           alt=""/></span></Link></li>
                {user ? <li onClick={openCloseNavigation}><Link className='link-helper' to='/favourites' ><p>Favourites</p><span className='navigation-icon'><img
                    src={heartSVG} alt=""/></span></Link></li> : null }
            </ul>
            <div className="bottom-section">
                <div className='cart-icon' onClick={openCloseCart}><img src={cartSVG} alt=""/><span className='navigation-icon'>{items.length}</span></div>
                <div className='user-icon' onClick={redirectToProfile}><span className='navigation-icon'><img src={user ? userProfilePic : userSVG} alt=""/></span></div>
            </div>
        </div>
    )
}
export default NavigationBarExtension