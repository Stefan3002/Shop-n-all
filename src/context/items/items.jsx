import {createContext, useReducer} from "react";

export const ItemsContext = createContext({
    items: [],
    setItems: () => null
})

const itemsReducer = (state, action) => {
    const {type, payload} = action

    switch (type){
        case 'SET_ITEMS':
            return {
                ...state,
                items: payload
            }
            break
        default:
            throw new Error('Unhandled type of action.')
    }
}
const INITIAL_VALUE = {
    items: []
}

export const ItemsContextProvider = ({children}) => {
    const [{items}, dispatch] = useReducer(itemsReducer, INITIAL_VALUE)

    const setItems = (x) => dispatch({type: 'SET_ITEMS', payload: x})


    const sharedValue = {items, setItems}
    return <ItemsContext.Provider value={sharedValue}>{children}</ItemsContext.Provider>
}