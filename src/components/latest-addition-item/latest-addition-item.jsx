import './latest-addition-item.css'
import {Link, useParams} from "react-router-dom";
const LatestAdditionItem = ({categoryTitle, item, animationDelay}) => {
    const {imageUrl, id} = item

    return (
        <div className='latest-addition-item-container' style={{'animationDelay': `${animationDelay}00ms`}}>
            <Link to={`${categoryTitle}/${id}`}><img src={imageUrl} alt=""/></Link>
        </div>
    )
}
export default LatestAdditionItem