import './checkout-page.css'
import {useContext} from "react";
import {CheckoutContext, getCartTotal, getNumberOfItems} from "../../context/checkout/checkout";
import CheckoutItem from "../checkout-item/checkout-item";
import Button from "../button/button";
const CheckoutPage = () => {
    const {items} = useContext(CheckoutContext)
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
                <Button color='#dca536' text='Pay.' />
            </div>
        </div>
    )
}
export default CheckoutPage