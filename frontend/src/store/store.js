import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducers/ProductReducer.js";
import {errorReducer} from "./reducers/ErrorReducer.js";
import {categoryReducer} from "./reducers/CategoryReducer.js";
import { cartReducer } from "./reducers/CartReducer.js";
import { authReducer } from "./action/AuthReducer.js";

const cartItems = localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):
    [];
        
const user = localStorage.getItem("auth")?
        JSON.parse(localStorage.getItem("auth")):
        [];

const initialState = {
    carts : {
        cart : cartItems,
    },
    auth: {
        user : user,
    },
};

export const store = configureStore(
    {
        reducer:{
            products : productReducer,
            errors : errorReducer,
            categories : categoryReducer,
            carts: cartReducer,
            auth : authReducer,
        },
        preloadedState : initialState,
    }
);

export default store;