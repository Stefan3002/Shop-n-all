export const setReviews = (reviews) => {
    return {
        type: 'SET_REVIEWS',
        payload: reviews
    }
}

export const setStarAverage = (n) => {
    return {
        type: 'SET_STAR_AVERAGE',
        payload: n
    }
}