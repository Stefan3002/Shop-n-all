import {createContext, useEffect, useState} from "react";
import {fetchCategoriesAndItems} from "../utils/firebase/firebase";

export const CategoriesContext = createContext({
    categories: {},
    setCategories: () => null
})


export const CategoriesContextProvider = ({children}) => {
    const [categories, setCategories] = useState({})
    const sharedValue = {categories, setCategories}

    useEffect(() => {
        (async () => {
            setCategories(await fetchCategoriesAndItems())
        })()
    }, [])

    return <CategoriesContext.Provider value={sharedValue}>{children}</CategoriesContext.Provider>
}