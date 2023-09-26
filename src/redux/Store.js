import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice";  
import productSlice from "./ProductSlice";
import FilterSortSlice from "./FilterSortSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    Product:productSlice.reducer,
    FilterSortSlice:FilterSortSlice.reducer,
  },
});

export default store;
