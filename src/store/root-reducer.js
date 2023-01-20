import {combineReducers} from "redux";
import {categoriesReducer} from "./categories-reducer";
import {profileReducer} from './profile/profile-reducer'
import {reviewsReducer} from "./reviews/reviews-reducer";
import {navigationReducer} from "./navigation/navigation-reducer";
import {checkoutReducer} from "./checkout/checkout-reducer";

export const rootReducer = combineReducers({
    categories: categoriesReducer,
    profile: profileReducer,
    reviews: reviewsReducer,
    navigation: navigationReducer,
    checkout: checkoutReducer
})