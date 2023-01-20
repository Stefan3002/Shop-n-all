const INITAL_STATE = {
    cartItems: [],
    cartOpened: false
}

export const checkoutReducer = (state = INITAL_STATE, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_CART_OPENED':
            return {
                ...state,
                cartOpened: payload
            }
        case 'SET_CART_ITEMS':
            return {
                ...state,
                cartItems: payload
            }
        default:
            return state
    }
}