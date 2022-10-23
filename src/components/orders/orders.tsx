import './orders.css'
import * as React from "react";
import Order from '../Order/order'

interface OrdersProps {
    content: {
        date: Date,
        id: string,
        items: {
            quantity: number,
            item: {
                category: string,
                id: number,
                imageUrl: string,
                name: string,
                price: number,
            }
        }[],
        status: string,
        total: number,
        userId: string
    }[]
}

const Orders: React.FC = (props: OrdersProps) => {
    const {content} = props
    console.log('1111111', content[0], content)
    return (
        <div>
            {content.map((order) => {
                {console.log('2222222222', order)}
                return <Order key={order.id} order={order} />
            })}

        </div>
    )
}
export default Orders