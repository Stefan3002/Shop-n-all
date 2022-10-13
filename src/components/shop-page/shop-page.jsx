import './shop-page.css'
import {Route, Routes} from "react-router-dom";
import SpecificShopPage from "../specific-shop-page/specific-shop-page";
import CategoriesPreview from "../categories-preview/categories-preview";
import {useEffect} from "react";
import {setCategories} from "../../store/categories-actions";
import {useDispatch} from "react-redux";
const ShopPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await setCategories(dispatch)
        })()
    }, [])

    return (
        <Routes>
            <Route path='/:categoryTitle/*' element={<SpecificShopPage />}/>
            <Route index element={<CategoriesPreview />}/>
        </Routes>
    )
}
export default ShopPage