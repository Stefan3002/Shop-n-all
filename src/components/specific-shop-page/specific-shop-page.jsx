import './specific-shop-page.css'
import {Route, Routes, useParams} from "react-router-dom";
import ProductInfo from "../product-info/product-info";
import CategoryShopPage from "../category-shop-page/category-shop-page";
import {useSelector} from "react-redux";
import {getCategories} from "../../store/categories-selectors";


const SpecificShopPage = () => {
    const {categoryTitle} = useParams()
    const categories = useSelector(getCategories)
    const items = categories[categoryTitle]

    return (
        <Routes>
            <Route path='/:productId' element={<ProductInfo itemsArray={items} />} />
            <Route index element={<CategoryShopPage itemsArray={items} categoryTitle={categoryTitle} />} />
        </Routes>
    )
}
export default SpecificShopPage