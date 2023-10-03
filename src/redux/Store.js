import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice";  
import productSlice from "./ProductSlice";
import FilterSortSlice from "./FilterSortSlice";
import reviewsSlice from "./ReviewSlice";
import userSlice from "./UserInfoSlice";
 
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    Product:productSlice.reducer,
    FilterSortSlice:FilterSortSlice.reducer,
    Reviews: reviewsSlice.reducer ,
    user: userSlice.reducer
 
  },
});

export default store;
