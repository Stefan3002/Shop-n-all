const INITIAL_VALUE = {
    navigationOpened: false
}

export const timeToClose = 1

export const navigationReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type){
        case 'SET_NAVIGATION_OPENED':
            return {
                ...state,
                navigationOpened: payload
            }
        default:
            return state
    }
}