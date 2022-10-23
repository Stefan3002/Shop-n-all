import './profile-info-container.css'
import ItemReview from "../item-review/item-review";
import defaultImg from '../../utils/imgs/defaultImg.svg'
import ItemCard from "../item-card/item-card";
import noAddressImg from '../../utils/imgs/address.svg'
import moneySVG from "../../utils/imgs/money-svgrepo-com.svg";
import packageSVG from "../../utils/imgs/package-svgrepo-com.svg";
import customerSVG from "../../utils/imgs/customer-service-help-svgrepo-com.svg";
import AddressInput from "../AddressInput/address-input";
import missingSVG from '../../utils/imgs/noFavourites.svg'
import Orders from "../orders/orders.tsx";
import Order from "../Order/order";

const ProfileInfoContainer = ({type, content, user}) => {
    return (
        <div className='profile-info-container'>
            {content.length <= 0 && type !== 'benefits' ? <div>
                <h2>There is nothing to see here!</h2>
                <img src={missingSVG} />
            </div> : null }
            {content.length > 0 && type === 'default' ? <div><p>Select a category to view your info.</p><img src={defaultImg} alt=""/></div> : null}
            {content.length > 0 && type === 'reviews' ? <div className='profile-reviews-container'>
                {
                content.map((data) => {
                return <ItemReview data={data} imageUrl={data.item.imageUrl} itemName={data.item.name} />
            })}
            </div>: null}
            {type === 'benefits' ? <div>
                <h2>Regular benefits.</h2>
                <div className="benefits">
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
            </div>: null}
            {content.length > 0 && type === 'addresses' ? <div>
                <p>Here are your addresses: </p>
                {content === undefined ? <div>
                    <img src={noAddressImg} alt=""/>
                </div> : <div>
                    {content.address}
                </div>}
                <AddressInput />
            </div> : null}
            {content.length > 0 && type === 'favourites' ? content.map((data) => {
                return <ItemCard item={data} itemDelay='0' />
            }): null}

            {content.length > 0 && type === 'orders' ? <div>
                {content.map((order) => {
                    return <Order key={order.id} order={order} seeMore={true} sendBackButton={false} priceInfo={false} />
                })}
            </div>: null}
        </div>
    )
}
//I add random comment and save.
export default ProfileInfoContainer




