import './order.css'
const Order = ({order}) => {
    const {items} = order
    return (
        <div className='order-container'>
            <p>{order.date.toDate().toLocaleDateString('ro-RO')}</p>
            {items.map((item) => {
                return <div className='order-items'>
                    <h2>{item.item.name}</h2>
                    <img src={item.item.imageUrl} alt=""/>
                    <p>{item.quantity}</p>
                </div>
            })}
        </div>
    )
}
export default Order