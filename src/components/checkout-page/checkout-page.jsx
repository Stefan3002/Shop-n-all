import './checkout-page.css'
import {useContext, useEffect, useRef, useState} from "react";
import {CheckoutContext, getCartTotal, getNumberOfItems} from "../../context/checkout/checkout";
import CheckoutItem from "../checkout-item/checkout-item";
import Button from "../button/button";
import {useSelector} from "react-redux";
import {getUser} from "../../store/profile/profile-selectors";
import {addOrderToDB, getAddresses} from "../../utils/firebase/firebase";
import AddressInput from "../AddressInput/address-input";
const CheckoutPage = () => {
    const {items} = useContext(CheckoutContext)
    const user = useSelector(getUser)
    const [addresses, setAddresses] = useState({})

    useEffect(() => {
        (async () => {
            setAddresses(await getAddresses(user))
            // console.log(addresses)
        })()
    }, [])

    const createOrder = async () => {
        await addOrderToDB(items, user)
    }


    return (
        <div className='checkout-page-container'>
            <div className="master">
                <h1>Checkout.</h1>
                {items.map((item) => {
                    return <CheckoutItem key={item.id} data={item} />
                })}
            </div>
            <div className="aside">
                <h2 className='total-title'>Total: </h2>
                <p className='total-price-container'>{getCartTotal(items)} $</p>
                <p>For {getNumberOfItems(items)} items:</p>
                {
                    items.map((item) => {
                        return <div key={`total${item.id}`}>
                            {item.quantity} {item.item.name}
                        </div>
                    })
                }
                <br/>
                <Button clickHandler={createOrder} color='#dca536' text='Pay.' />
            </div>
            <div className="addresses-selector">
                <h2>Delivery address:</h2>
                <div className="address-container">
                    <form action="">
                        <input type="checkbox"/>
                    </form>
                    {addresses ? addresses.address : null}
                </div>
                <h2>Or tell us a new address:</h2>
                <AddressInput />
            </div>
        </div>
    )
}
export default CheckoutPage