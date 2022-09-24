import './category-preview.css'
import {Link} from "react-router-dom";
const CategoryPreview = ({items, categoryTitle}) => {
    const item = items[items.length - 1]
    const {imageUrl} = item
    return (
        <div className='category-preview-container'>
            <Link to={categoryTitle}>
                <img src={imageUrl} alt=""/>
                {/*<h2>{categoryTitle}</h2>*/}
            </Link>
        </div>
    )
}

export default CategoryPreview