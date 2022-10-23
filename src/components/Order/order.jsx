import './order.css'
import Button from "../button/button";
import {Link} from "react-router-dom";
const Order = ({order, seeMore, cancelButton, sendBackButton, priceInfo}) => {
    const {items} = order
    return (
        <div className='order-container'>
            <div className="extra-info">
                <h2>Total price: {order.total}$</h2>
                <p>Status: {order.status.toUpperCase()} </p>
                <p>Date placed: {order.date.toDate().toLocaleDateString('en-EN')}</p>
            </div>
            <div className="items-info">
                {items.map((item) => {
                    return <Link to={`/shop/${item.item.category}/${item.item.id}`}>
                        <div className='order-items'>
                            <h2>{item.quantity} x {item.item.name}</h2>
                            <img src={item.item.imageUrl} alt=""/>
                            {priceInfo ? <p>{item.item.price} $</p> : null}
                        </div>
                    </Link>
                })}
            </div>
            <div className="buttons-container">
                {seeMore ? <Link to={`/orders/${order.id}`}><Button color='orange' text='See more.' /></Link> : null}
                {cancelButton ? <Button color='crimson' text='Cancel order.' /> : null}
                {sendBackButton ? <Button color='crimson' text='Send back the order.' /> : null}
            </div>

        </div>
    )
}
export default Order