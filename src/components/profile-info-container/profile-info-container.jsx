import './profile-info-container.css'
import ItemReview from "../item-review/item-review";
import defaultImg from '../../utils/imgs/defaultImg.svg'
import ItemCard from "../item-card/item-card";
import noAddressImg from '../../utils/imgs/address.svg'
import {addAddressToDB} from "../../utils/firebase/firebase";
const ProfileInfoContainer = ({type, content, user}) => {

    const addAddress = async (event) => {
        event.preventDefault()
        const country = event.target[0].value
        const address = event.target[1].value
        await addAddressToDB(country, address, user)
    }

    return (
        <div className='profile-info-container'>
            {type === 'default' ? <div><p>Select a category to view your info.</p><img src={defaultImg} alt=""/></div> : null}
            {type === 'reviews' ? content.map((data) => {
                return <ItemReview data={data} imageUrl={data.item.imageUrl} itemName={data.item.name} />
            }) : null}
            {type === 'addresses' ? <div>
                <p>Here are your addresses: </p>
                {content === undefined ? <div>
                    <img src={noAddressImg} alt=""/>
                    <p>Add an address:</p>
                    <form onSubmit={addAddress}>
                        <label htmlFor="">Country: </label>
                        <select name="" id="">
                           <option value="alba"> Alba</option>
                           <option value="arad"> Arad</option>
                          <option value="pitesti">  Pitești</option>
                           <option value="bacau"> Bacău</option>
                          <option value="oradea">  Oradea</option>
                           <option value="bistrita-nasaud"> Bistrița-Năsăud</option>
                          <option value="botosani">  Botoșani</option>
                           <option value="brasov"> Brașov</option>
                         <option value="braila">   Brăila</option>
                         <option value="bucuresti">   București</option>
                         <option value="">   Caraș-Severin</option>
                          <option value="">  Călărași</option>
                          <option value="">  Cluj</option>
                          <option value="">  Constanța</option>
                          <option value="">  Covasna</option>
                          <option value="">  Dâmbovița</option>
                          <option value="">  Dolj</option>
                          <option value="">  Galați</option>
                         <option value="">   Giurgiu</option>
                         <option value="">   Gorj</option>
                          <option value="">  Hunedoara</option>
                          <option value="">  Ialomița</option>
                          <option value="">  Iași</option>
                          <option value="">  Ilfov</option>
                          <option value="">  Maramureș</option>
                          <option value="">  Mehedinți</option>
                          <option value="">  Mureș</option>
                          <option value="">  Neamț</option>
                          <option value=""> Prahova</option>
                          <option value="">  Satu Mare</option>
                         <option value="">   Sălaj</option>
                          <option value="">  Sibiu</option>
                         <option value="">   Suceava</option>
                             <option value="">  Teleorman </option>
                              <option value="">   Timiș </option>
                             <option value="">  Tulcea </option>
                              <option value="">  Vaslui </option>
                              <option value="">  Vâlcea </option>
                              <option value="">  Vrancea </option>
                        </select>
                        <label htmlFor="">Address: </label>
                        <input type="text"/>
                        <button text='Add.' type='submit' color='orange'>Add.</button>
                    </form>
                </div> : <div>
                    {content.address}
                </div>}
            </div> : null}
            {type === 'favourites' ? content.map((data) => {
                return <ItemCard item={data} itemDelay='0' />
            }): null}
        </div>
    )
}
export default ProfileInfoContainer




