import './home-page.css'
import Button from "../button/button";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {PopupContext} from "../../context/popup/popup";
import {createAccountGoogle, createUserDoc} from "../../utils/firebase/firebase";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/profile/profile-actions";
const HomePage = () => {

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
            <div className='home-page-container' >
                <div className="text">
                    <h1 className='title-container'>Shop-n-all</h1>
                    <i className='sign-in-button'><Button text='Sign in with Google.' color='whitesmoke' clickHandler={createAccountGoogleFace}/></i>
                    <Link className='button-home-page' to='/shop'><Button text='Shop now.' color='whitesmoke' fontSize='1.5em'/></Link>
                </div>

                {/*{Photo by <a href="https://unsplash.com/ja/@wesleyphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Wesley Tingey</a> on <a href="https://unsplash.com/s/photos/fashion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>*/}

            </div>
    )
}
export default HomePage