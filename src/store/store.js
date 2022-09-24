import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import {logger} from "redux-logger/src";


const middleWares = [logger]
const enhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, enhancers)