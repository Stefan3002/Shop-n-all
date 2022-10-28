import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {CheckoutContextProvider} from "./context/checkout/checkout";
import {PopupContextProvider} from "./context/popup/popup";
import {FavouritesContextProvider} from "./context/favourites/favourites";
import {ItemsContextProvider} from "./context/items/items";
import {Provider} from "react-redux";
import {store} from "./store/store";
import * as serviceWorker from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <PopupContextProvider>
                  <FavouritesContextProvider>
                      <ItemsContextProvider>
                          <CheckoutContextProvider>
                              <App />
                          </CheckoutContextProvider>
                      </ItemsContextProvider>
                  </FavouritesContextProvider>
              </PopupContextProvider>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);

serviceWorker.register()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
