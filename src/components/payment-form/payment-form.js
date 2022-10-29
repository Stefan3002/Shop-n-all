import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const paymentHandler = async (event) => {
        event.preventDefault()
        if(!stripe || !elements)
            return
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-type': 'applications/json'
            },
            body: JSON.stringify({amount: 100})
        }).then(res => res.json())

        console.log(response)
        const clientSecret = response.client_secret
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            card: elements.getElement(CardElement),
            billing_details: {
                name: 'Stefan'
            }
        })
    }

    return (
        <div className='payment-container'>
            <form onSubmit={paymentHandler} action="">
                <CardElement />
                <button type='submit'>PAy!</button>
            </form>
        </div>
    )
}
export default PaymentForm