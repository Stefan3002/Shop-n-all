export const getCartTotal = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.item.price,0)
}

export const getNumberOfItems = (items) => {
    return items.reduce((acc, item) => acc + item.quantity, 0)
}