import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import productReducer from "../slices/productSlice";
import authSlice from "../slices/authSlice";
import orderSlice from "../slices/orderSlice";
// import wishlistReducer from "../slices/wishlistSlice";
 
const store = configureStore({
    reducer : {
        auth : authSlice,
        cart : cartReducer,
        product : productReducer,
        order : orderSlice,
        // wishlist : wishlistReducer
    }
})

export default store;