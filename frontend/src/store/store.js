import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducers/ProductReducer.js";

export const store = configureStore(
    {
        reducer:{
            products : productReducer,
        },
        preloadedState:{},
    }
);

export default store;