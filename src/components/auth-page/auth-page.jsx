import './auth-page.css'
import Button from "../button/button";
import {createAccountGoogle, createUserDoc} from "../../utils/firebase/firebase";
import {useContext} from "react";
import {PopupContext} from "../../context/popup/popup";
import authImg from '../../utils/imgs/auth.svg'
import {useDispatch} from "react-redux";
import {setUser} from "../../store/profile/profile-actions";

const AuthPage = () => {
    const dispatch = useDispatch()
    const {setPoppedUp, setPopUpText, setPopUpType} = useContext(PopupContext)

    const createAccountGoogleFace = async () => {
        const response = await createAccountGoogle()
        const userData = response.user
        setPopUpText(`Hello, ${userData.displayName}`)
        setPoppedUp(true)
        setPopUpType('success')
        setTimeout(() => {
            setPoppedUp(false)
        }, 2500)
        // console.log(userData)
        await createUserDoc(userData)
        dispatch(setUser(userData))
    }
        return (
        <div className='auth-page-container'>
            <div className='auth-container'>
                {/*<i className="fa-brands fa-google"></i>*/}
                <Button text='Sign in with Google.' color='orange' clickHandler={createAccountGoogleFace}/>
                <img src={authImg} alt=""/>
            </div>
        </div>
    )
}
export default AuthPage