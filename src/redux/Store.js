import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice"; // Import cartSlice directly from Slice.js
import productSlice from "./ProductSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    Product:productSlice.reducer
  },
});

export default store;
