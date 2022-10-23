import './orders-route.css'
import {Route, Routes} from "react-router-dom";
import OrderInfo from "../order-info/order-info.jsx";
const OrdersRoute = () => {
    return (
        <Routes>
            <Route path='/:orderId' element={<OrderInfo />}/>
        </Routes>
    )
}
export default OrdersRoute