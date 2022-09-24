import {useState, createContext} from "react";

export const PopupContext = createContext({
    poppedUp: false,
    setPoppedUp: () => null,
    popUpText: '',
    setPopUpText: () => null
})

export const PopupContextProvider = ({children}) => {
    const [poppedUp, setPoppedUp] = useState(false)
    const [popUpText, setPopUpText] = useState('')
    const sharedValue = {poppedUp, setPoppedUp, popUpText, setPopUpText}
    return <PopupContext.Provider value={sharedValue}>{children}</PopupContext.Provider>
}