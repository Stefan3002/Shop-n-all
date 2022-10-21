import './categories-preview.css'
import CategoryPreview from "../category-preview/category-preview";
import LatestAddition from "../latest-addition/latest-addition";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCategories} from "../../store/categories-selectors";
const CategoriesPreview = () => {
    const categories = useSelector(getCategories)

    return (
        <div className='shop-container'>
            {
                Object.keys(categories).map((categoryKey) => {
                    return (
                        <div className='shop-container-row'>
                            <CategoryPreview key={categoryKey} items={categories[categoryKey]} categoryTitle={categoryKey} />
                            <Link to={categoryKey}>
                                <div className="shop-container-text">
                                    <span className='latest-addition-text'>Latest <br/> additions:</span>
                                    <span className='category-title'>{categoryKey}</span>
                                </div>
                            </Link>
                            <LatestAddition key={`category${categoryKey}`} categoryTitle={categoryKey} items={categories[categoryKey]}  />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default CategoriesPreview