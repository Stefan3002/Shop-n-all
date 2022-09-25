import './spinner.css'
import spinnerImg from '../../utils/imgs/loading.svg'
import Blur from "../blur/blur";
const Spinner = () => {
    return (
        <>
            <Blur />
            <div className='spinner-container'>
                <img src={spinnerImg} alt=""/>
            </div>
        </>

    )
}
export default Spinner