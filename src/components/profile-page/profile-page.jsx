import './profile-page.css'
import {useContext, useEffect} from "react";
import greetingsImg from '../../utils/imgs/hello.svg'
import favouritesImg from '../../utils/imgs/favourite_1.svg'
import {FavouritesContext} from "../../context/favourites/favourites";
import LatestAdditionItem from "../latest-addition-item/latest-addition-item";
import {retrieveFavourites} from "../../utils/firebase/firebase";
import {useSelector} from "react-redux";
import {getUser} from "../../store/profile/profile-selectors";


const ProfilePage = () => {
    const user = useSelector(getUser)
    let displayName = '', email = ''
    if(user){
        displayName = user.displayName
        email = user.email
    }
    // const {favourites, setFavourites} = useContext(FavouritesContext)
    //
    // useEffect(() => {
    //     (async () => {
    //         setFavourites(await retrieveFavourites(user))
    //     })()
    // }, [user])

    return (
        <div className='profile-container'>
            <div className='section'>
                <div className='profile-basic-info-container'>
                    {user ? <img src={user.photoURL} alt=""/> : null}
                    {user ? <h2 className='colored'>{displayName}</h2> : null}
                    {user ? <p>{email}</p> : null}
                </div>
                <img src={greetingsImg} alt=""/>
            </div>
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