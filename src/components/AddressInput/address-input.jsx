import './address-input.css'
import {addAddress} from '../../utils/methods/address'
import {useSelector} from "react-redux";
import {getUser} from '../../store/profile/profile-selectors'
import Button from "../button/button";


const AddressInput = () => {
const user = useSelector(getUser)

    return (
        <div>
            <p>Add an address:</p>
            <form onSubmit={addAddress(user)}>
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
                <Button color='#dca536' text='Add.' type='submit' color='orange' />
            </form>
        </div>
    )
}
export default AddressInput