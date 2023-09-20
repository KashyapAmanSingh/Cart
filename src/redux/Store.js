import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice";

  


const store =configureStore({
    reducer:{
        cart:cartSlice
    }
})

export default store; 