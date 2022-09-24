const INITIAL_VALUE = {
    categories: {}
}

export const categoriesReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type){
        case 'SET_CATEGORIES':
            return {
                categories: payload
            }
        default:
            return state
    }
}

