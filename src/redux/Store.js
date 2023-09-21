import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice"; // Import cartSlice directly from Slice.js

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
