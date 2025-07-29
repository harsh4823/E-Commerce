import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducers/ProductReducer.js";
import {errorReducer} from "./reducers/ErrorReducer.js";
import {categoryReducer} from "./reducers/CategoryReducer.js";
import { cartReducer } from "./reducers/CartReducer.js";

const cartItems = localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):
        [];

const initialState = {
    carts : {
        cart : cartItems,
        totalPrice : 0,
        cartId : null,
    }
};

export const store = configureStore(
    {
        reducer:{
            products : productReducer,
            errors : errorReducer,
            categories : categoryReducer,
            carts : cartReducer,
        },
        preloadedState : initialState,
    }
);

export default store;