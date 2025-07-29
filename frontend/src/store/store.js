import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducers/ProductReducer.js";
import {errorReducer} from "./reducers/ErrorReducer.js";
import {categoryReducer} from "./reducers/CategoryReducer.js";

const cartItems = localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):
        [];

const initialState = {
    carts : cartItems,
};

export const store = configureStore(
    {
        reducer:{
            products : productReducer,
            errors : errorReducer,
            categories : categoryReducer,
            carts : categoryReducer,
        },
        preloadedState : initialState,
    }
);

export default store;