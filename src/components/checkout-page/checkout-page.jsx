import './checkout-page.css'
import {useContext, useEffect, useState} from "react";
import CheckoutItem from "../checkout-item/checkout-item";
import Button from "../button/button";
import {useSelector} from "react-redux";
import {getUser} from "../../store/profile/profile-selectors";
import {addOrderToDB, getAddresses} from "../../utils/firebase/firebase";
import AddressInput from "../AddressInput/address-input";
import {getCartItems} from "../../store/checkout/checkout-selectors.";
import {getCartTotal, getNumberOfItems} from "../../store/checkout/utils";
import emailjs from '@emailjs/browser';
import {useNavigate} from "react-router-dom";

const CheckoutPage = () => {
    const items = useSelector(getCartItems)
    const user = useSelector(getUser)
    const [addresses, setAddresses] = useState({})
    const redirect = useNavigate()

    useEffect(() => {
        (async () => {
            setAddresses(await getAddresses(user))
            // console.log(addresses)
        })()
    }, [])

    const emailParams = {
        user_name: user.displayName,
        email_dest: user.email,
        items: items.toString(),
        total: getCartTotal(items)
    }
    console.log(JSON.stringify(items))
    const createOrder = async () => {
        await addOrderToDB(items, user)
        emailjs.send('service_d8si4b3', 'template_dktmikz', emailParams, 'mtFLxN0qfwSBF7ft1')
            .then((result) => {
            }, (error) => {
                console.log(error)
            });
        redirect('/profile')
    }



    return (
        <div className='checkout-page-container'>
            <div className="master">
                <h1>Checkout.</h1>
                <div className="checkout-items">
                    {items.map((item) => {
                        return <CheckoutItem key={item.id} data={item} />
                    })}
                </div>
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
            {/*<div className="card-payment">*/}
            {/*    <PaymentForm />*/}
            {/*</div>*/}
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