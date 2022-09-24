
const INITIAL_VALUE = {
    profileOpened: false,
    user: null
}

export const profileReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type){
        case 'SET_PROFILE_OPENED':
            return{
                ...state,
                profileOpened: payload
            }
        case 'SET_USER':
            return {
                ...state,
                user: payload
            }
        default:
            return state
    }
}