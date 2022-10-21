import './order.css'
const Order = ({order}) => {
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
                    return <div className='order-items'>
                        <h2>{item.quantity} x {item.item.name}</h2>
                        <img src={item.item.imageUrl} alt=""/>
                    </div>
                })}
            </div>
        </div>
    )
}
export default Order