import './order-info.css'
import * as React from "react";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getOrder} from '../../utils/firebase/firebase.js'
import Order from "../Order/order";

const OrderInfo = () => {

    const {orderId} = useParams()
    const [order, setOrder] = useState(null)
    useEffect(() => {
        (async () => {
            setOrder(await getOrder(orderId))
        })()
    }, [])

    return (

        <div className='order-info-container'>
            {order ? <div>
                <Order order={order} seeMore={false} cancelButton={true} sendBackButton={true} priceInfo={true} />
            </div>: null}
        </div>
    )
}
export default OrderInfo