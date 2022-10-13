import './profile-page.css'
import greetingsImg from '../../utils/imgs/hello.svg'
import {useSelector} from "react-redux";
import {getUser} from "../../store/profile/profile-selectors";
import {retrieveUserData, signOutHandler} from "../../utils/firebase/firebase";
import ProfileInfoContainer from "../profile-info-container/profile-info-container";
import {useState} from "react";


const ProfilePage = () => {
    const user = useSelector(getUser)
    let uid = ''
    if(user)
        uid = user.uid



    const [typeOfInfo, setTypeOfInfo] = useState('default')
    const [contentInfo, setContentInfo] = useState('')
    let displayName = '', email = ''
    if(user){
        displayName = user.displayName
        email = user.email
    }
    const reviewsInfo = () => {
        (async () => {
            const userData = await retrieveUserData(uid)
            setTypeOfInfo('reviews')
            setContentInfo(userData.reviews)
        })()
    }
    const favouritesInfo = () => {
        (async () => {
            const userData = await retrieveUserData(uid)
            setTypeOfInfo('favourites')
            setContentInfo(userData.favourites)
        })()
    }
    const addressesInfo = () => {
        (async () => {
            const userData = await retrieveUserData(uid)
            setTypeOfInfo('addresses')
            setContentInfo(userData.address)
        })()
    }


    return (
        <div className='profile-container'>
            <div className='section'>
                <div className='profile-basic-info-container'>
                    {user ? <img src={user.photoURL} alt=""/> : null}
                    {user ? <h2 className='colored'>{displayName}</h2> : null}
                    {user ? <p>{email}</p> : null}
                    <ul className="profile-menu">
                        <li className='profile-menu-item' onClick={reviewsInfo}><i className="fa fa-2x fa-solid fa-star"></i>Reviews.</li>
                        <li className='profile-menu-item' onClick={favouritesInfo}><i className="fa fa-2x fa-solid fa-heart"></i>Favourites.</li>
                        <li className='profile-menu-item'><i className="fa fa-2x fa-solid fa-newspaper"></i>Orders.</li>
                        <li className='profile-menu-item' onClick={addressesInfo}><i className="fa fa-2x fa-solid fa-map-location-dot"></i>Addresses.</li>
                        <li className='profile-menu-item' onClick={signOutHandler}><i className="fa fa-2x fa-solid fa-right-from-bracket"></i>Sign Out.</li>
                    </ul>
                </div>
                <img src={greetingsImg} alt=""/>
            </div>
            <ProfileInfoContainer type={typeOfInfo} content={contentInfo} user={user}/>
            {/*<div className='section'>*/}
            {/*    <img src={favouritesImg} alt=""/>*/}
            {/*    <p>Your favourite items:</p>*/}
            {/*    <div className="favourite-items">*/}
            {/*        {*/}
            {/*            favourites.map((favourite, idx) => {*/}
            {/*                if(idx > favourites.length - 6 && idx < favourites.length - 1)*/}
            {/*                    return <LatestAdditionItem categoryTitle={undefined} item={favourite}/>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </div>*/}

            {/*</div>*/}

        </div>
    )
}
export default ProfilePage