const INITIAL_VALUE = {
    categories: {},
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type){
        case 'SET_CATEGORIES_START':
            return {
                ...state,
                isLoading: true
            }
        case 'SET_CATEGORIES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                categories: payload
            }
        case 'SET_CATEGORIES_ERROR':
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}

