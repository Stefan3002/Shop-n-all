import './home-page.css'
import Button from "../button/button";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {PopupContext} from "../../context/popup/popup";
import {createAccountGoogle, createUserDoc} from "../../utils/firebase/firebase";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/profile/profile-actions";
import Benefits from "../benefits/benefits";
import ItemHomePage from "../item-home-page/item-home-page.tsx";
import ReviewsHomePage from "../reviews-home-page/reviews-home-page.tsx";
import Parallax from "../Parallax/parallax.tsx";
import parallaxImg1 from '../../utils/imgs-landing-page/parallaxImg.jpg'
import parallaxImg2 from '../../utils/imgs-landing-page/parallaxImg2.jpg'
import parallaxImg3 from '../../utils/imgs-landing-page/parallaxImg3.jpg'
import parallaxImg4 from '../../utils/imgs-landing-page/parallaxImg4.jpg'
import parallaxImg5 from '../../utils/imgs-landing-page/parallaxImg5.jpg'

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
        await createUserDoc(userData)
        dispatch(setUser(userData))
    }

    const parallaxImgs = [
        {
            img: parallaxImg1,
            text: 'Sneakers',
            position: 'bottom'
        },
        {
            img: parallaxImg2,
            text: 'Jackets',
            position: 'center'
        },
        {
            img: parallaxImg3,
            text: 'Hats',
            position: 'top'
        },
        {
            img: parallaxImg4,
            text: 'Women',
            position: 'top'
        },
        {
            img: parallaxImg5,
            text: 'Men',
            position: 'top'
        }

    ]


    return (
            <div className='home-page-container' >
                <div className="landing">
                    <div className="text">
                        <h1 className='title-container'>Shop-n-all</h1>
                        <i className='sign-in-button'><Button text='Sign in with Google.' color='whitesmoke' clickHandler={createAccountGoogleFace}/></i>
                        <Link className='button-home-page' to='/shop'><Button text='Shop now.' color='whitesmoke' fontSize='1.5em'/></Link>
                        <i className="mouse-icon fa-3x fa fa-solid fa-computer-mouse"></i>
                    </div>
                </div>

                <div className="home-page-wrapper">
                    <Benefits />
                </div>
                <ItemHomePage />
                <div className="home-page-wrapper">
                    <ReviewsHomePage />
                </div>
                <Parallax data={parallaxImgs} />

                {/*{Photo by <a href="https://unsplash.com/ja/@wesleyphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Wesley Tingey</a> on <a href="https://unsplash.com/s/photos/fashion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>*/}

            </div>
    )
}
export default HomePage