import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducers/ProductReducer.js";
import {errorReducer} from "./reducers/ErrorReducer.js";

export const store = configureStore(
    {
        reducer:{
            products : productReducer,
            errors : errorReducer,
        },
        preloadedState:{},
    }
);

export default store;