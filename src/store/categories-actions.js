import {fetchCategoriesAndItems} from "../utils/firebase/firebase";

export const setCategories = async (dispatch) => {
    dispatch(setCategoriesStart())
    try{
        const categories = await fetchCategoriesAndItems()
        dispatch(setCategoriesSuccess(categories))
    }catch(err){
        dispatch(setCategoriesError(err))
    }
}

export const setCategoriesStart = () => {
    return {
        type: "SET_CATEGORIES_START",
    }
}

export const setCategoriesSuccess = (categories) => {
    return {
        type: "SET_CATEGORIES_SUCCESS",
        payload: categories
    }
}

export const setCategoriesError = (error) => {
    return {
        type: "SET_CATEGORIES_ERROR",
        payload: error
    }
}