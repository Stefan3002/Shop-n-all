import {useState, createContext} from "react";

export const CheckoutContext = createContext({
    items: [],
    setItems: () => null,
    cartOpened: false,
    setCartOpened: () => null
})
export const getCartTotal = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.item.price,0)
}

export const getNumberOfItems = (items) => {
    return items.reduce((acc, item) => acc + item.quantity, 0)
}

export const CheckoutContextProvider = ({children}) => {
    const [items,setItems] = useState([])
    const [cartOpened, setCartOpened] = useState(false)
    const sharedValue = {items, setItems, cartOpened, setCartOpened}
    return <CheckoutContext.Provider value={sharedValue}>{children}</CheckoutContext.Provider>
}