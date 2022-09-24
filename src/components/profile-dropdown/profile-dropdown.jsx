import './profile-dropdown.css'
import {Link} from "react-router-dom";
import Blur from "../blur/blur";
import {setProfileOpened} from "../../store/profile/profile-actions";
import {useDispatch, useSelector} from "react-redux";
import {getProfileOpened, getUser} from "../../store/profile/profile-selectors";
import {signOutHandler} from "../../utils/firebase/firebase";



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
                <Link to='/profile'><p onClick={openCloseProfile}><i className="fa fa-xl fa-solid fa-id-card"></i>Profile.</p></Link>
                {/*<p onClick={openCloseProfile}><i className="fa fa-xl fa-solid fa-gear"></i>Settings.</p>*/}
                <p className='sign-out-button' onClick={signOutHelper}><i className="fa fa-xl fa-solid fa-right-from-bracket"></i>Sign out.</p>
            </div>
        </>

    )
}
export default ProfileDropdown