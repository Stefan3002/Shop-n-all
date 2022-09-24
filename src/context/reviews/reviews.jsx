import {createContext, useState} from "react";

export const ReviewsContext = createContext({
    itemReviews: [],
    setItemReviews: () => null
})

export const ReviewsContextProvider = ({children}) => {
    const [itemReviews, setItemReviews] = useState([])
    const sharedValue = {itemReviews, setItemReviews}
    return <ReviewsContext.Provider value={sharedValue}>{children}</ReviewsContext.Provider>
}