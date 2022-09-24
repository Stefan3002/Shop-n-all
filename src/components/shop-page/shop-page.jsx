import './shop-page.css'
import {Route, Routes} from "react-router-dom";
import SpecificShopPage from "../specific-shop-page/specific-shop-page";
import CategoriesPreview from "../categories-preview/categories-preview";
const ShopPage = () => {

    return (
        <Routes>
            <Route path='/:categoryTitle/*' element={<SpecificShopPage />}/>
            <Route index element={<CategoriesPreview />}/>
        </Routes>
    )
}
export default ShopPage