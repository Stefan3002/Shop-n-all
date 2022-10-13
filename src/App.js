import './App.css'
import ShopPage from "./components/shop-page/shop-page";
import NavigationBar from "./components/navigation-bar/navigation-bar";
import {Route, Routes} from 'react-router-dom'
import AuthPage from "./components/auth-page/auth-page";
import CheckoutPage from "./components/checkout-page/checkout-page";
import FavouritesPage from "./components/favourites-page/favourites-page";
import {useEffect} from "react";
import {onAuthStateChangeListener} from "./utils/firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {setCategories} from "./store/categories-actions";
import ProfileRoutes from "./routes/profile-routes";
import HomePage from "./components/home-page/home-page";
import AboutPage from "./components/about-page/about-page";
import {setUser} from "./store/profile/profile-actions";
import {getCategoriesIsLoading} from "./store/categories-selectors";
import Spinner from "./components/spinner/spinner";
const App = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getCategoriesIsLoading)


    useEffect(() => {
        onAuthStateChangeListener((user) => {
            dispatch(setUser(user))
        })
    }, [])

  return(
      <div>
          {isLoading ? <Spinner /> : null}
        <Routes>
            <Route path='/'  element={<NavigationBar />}>
                <Route path='/' element={<HomePage />}/>
                <Route path='/shop/*' element={<ShopPage />}/>
                <Route path='/auth' element={<AuthPage />}/>
                <Route path='/checkout' element={<CheckoutPage />}/>
                <Route path='/favourites' element={<FavouritesPage />}/>
                <Route path='/profile' element={<ProfileRoutes />}/>
                <Route path='/about' element={<AboutPage />}/>
            </Route>
        </Routes>
      </div>
  )
}
export default App