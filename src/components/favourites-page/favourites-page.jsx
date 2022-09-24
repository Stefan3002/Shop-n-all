import './favourites-page.css'
import {useContext, useEffect} from "react";
import {FavouritesContext} from "../../context/favourites/favourites";
import ItemCard from "../item-card/item-card";
import {retrieveFavourites} from "../../utils/firebase/firebase";
import noFavouritesImg from '../../utils/imgs/noFavourites.svg'
import {useSelector} from "react-redux";
import {getUser} from "../../store/profile/profile-selectors";

const FavouritesPage = () => {
    const {favourites, setFavourites} = useContext(FavouritesContext)
    const user = useSelector(getUser)
    useEffect(() => {
        (async () => {
            if(user)
                setFavourites(await retrieveFavourites(user))
        })()

    }, [user])
    return (
        <div className='favourites-page-container'>
            <h1>Your favourites items.</h1>
            <div className='favourite-items-container'>
                {favourites && favourites.length ? favourites.map((item, idx) => <ItemCard key={item.id} animationDelay={idx} item={item}/>) : null}
            </div>
            {!favourites || !favourites.length ? <img src={noFavouritesImg} alt=""/> : null}
        </div>

    )
}
export default FavouritesPage