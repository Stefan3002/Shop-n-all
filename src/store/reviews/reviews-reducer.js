const INITIAL_VALUE = {
    reviews: [],
    starAverage: 0
}

export const reviewsReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type){
        case 'SET_REVIEWS':
            return {
                ...state,
                reviews: payload
            }
        case 'SET_STAR_AVERAGE':
            return {
                ...state,
                starAverage: payload
            }
        default:
            return state
    }
}