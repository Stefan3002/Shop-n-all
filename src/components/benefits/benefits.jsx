import './benefits.css'
import moneySVG from "../../utils/imgs/money-svgrepo-com.svg";
import packageSVG from "../../utils/imgs/package-svgrepo-com.svg";
import customerSVG from "../../utils/imgs/customer-service-help-svgrepo-com.svg";
const Benefits = () => {
    return (
        <div className='benefits'>
                <div className='benefit1 benefit'>
                    <div className='benefit-header'>
                        <img src={moneySVG} alt=""/>
                        <h2>30 days money back.</h2>
                    </div>
                    <p>On our website anything you buy and don't like or does not fit can be returned in 30 days and you will get your money back.</p>
                </div>
                <div className='benefit benefit2'>
                    <div className='benefit-header'>
                        <img src={packageSVG} alt=""/>
                        <h2>Open the package before you pay.</h2>
                    </div>
                    <p>You can always open the package before you pay the courier. Just ask him and he will be glad to help you.</p>
                </div>
                <div className='benefit benefit3'>
                    <div className='benefit-header'>
                        <img src={customerSVG} alt=""/>
                        <h2>Permanent customer support.</h2>
                    </div>
                    <p>You can call us anytime, any day and we will try our best to help you! You can find the customer support telephone number in the "contact" page.</p>
                </div>
        </div>
    )
}
export default Benefits