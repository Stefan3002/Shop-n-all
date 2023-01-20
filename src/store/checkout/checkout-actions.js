export const setCartOpened = (bool) => {
    return {
        type: 'SET_CART_OPENED',
        payload: bool
    }
}
export const setCartItems = (items) => {
    return {
        type: 'SET_CART_ITEMS',
        payload: items
    }
}