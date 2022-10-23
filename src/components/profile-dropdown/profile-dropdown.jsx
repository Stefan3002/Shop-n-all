import './profile-dropdown.css'
import {Link} from "react-router-dom";
import Blur from "../blur/blur";
import {setProfileOpened} from "../../store/profile/profile-actions";
import {useDispatch, useSelector} from "react-redux";
import {getProfileOpened, getUser} from "../../store/profile/profile-selectors";
import {signOutHandler} from "../../utils/firebase/firebase";
import idCardSVG from '../../utils/imgs/idCardSVG.svg'
import aboutSVG from '../../utils/imgs/aboutSVG.svg'
import leaveSVG from '../../utils/imgs/leaveSVG.svg'


const ProfileDropdown = () => {
    const dispatch = useDispatch()
    const profileState = useSelector(getProfileOpened)
    const user = useSelector(getUser)

    const openCloseProfile = () => profileState ? dispatch(setProfileOpened(false)) : dispatch(setProfileOpened(true))

    const signOutHelper = async () => {
        openCloseProfile()
        await signOutHandler()
    }

    return (
        <>
            <Blur />
            <div className='profile-dropdown-container'>
                <img className='avatar-img' src={user.photoURL} alt=""/>
                <br/>
                <span onClick={openCloseProfile} className="close-btn"><i className="fa-3x fa-solid fa-circle-xmark"></i></span>
                <Link to='/profile'><p className='profile-dropdown-button-container' onClick={openCloseProfile}><img src={idCardSVG} alt=""/>Profile.</p></Link>
                <Link to='/about'><p className='profile-dropdown-button-container' onClick={openCloseProfile}><img src={aboutSVG} alt=""/>About.</p></Link>
                {/*<p onClick={openCloseProfile}><i className="fa fa-xl fa-solid fa-gear"></i>Settings.</p>*/}
                <p className='sign-out-button profile-dropdown-button-container' onClick={signOutHelper}><img src={leaveSVG} alt=""/>Sign out.</p>
            </div>
        </>

    )
}
export default ProfileDropdown