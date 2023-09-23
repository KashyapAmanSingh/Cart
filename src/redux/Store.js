import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice";  
import productSlice from "./ProductSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    Product:productSlice.reducer
  },
});

export default store;
