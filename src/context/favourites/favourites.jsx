import {useState, createContext} from "react";

export const FavouritesContext = createContext({
    favourites: [],
    setFavourites: () => null
})

export const FavouritesContextProvider = ({children}) => {
    const [favourites, setFavourites] = useState([])
    const sharedValue = {favourites, setFavourites}
    return <FavouritesContext.Provider value={sharedValue}>{children}</FavouritesContext.Provider>
}