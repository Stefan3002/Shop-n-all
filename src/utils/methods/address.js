import {addAddressToDB} from "../firebase/firebase";

export const addAddress = (user) => async (event) => {
    console.log(event)
    event.preventDefault()
    const country = event.target[0].value
    const address = event.target[1].value
    await addAddressToDB(country, address, user)
}