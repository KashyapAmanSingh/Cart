import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    searchedItem: (state, action) => {
      state.items = action.payload;
    },
    sortedItem: (state, action) => {
      state.items = action.payload;
      // console.log(
      //   "Response sortedItem  from productSlice  action.payload :",
      //   action.payload
      // );
    },
    filteredItem: (state,action) => {
      // console.log(
      //   "Response productSlice  filteredItem   filteredItem :",
      //   action.payload
      // );
        state.items = action.payload;
      
    },
    homeItem: (state, action) => {
      state.items = action.payload;
      
    },
    DetailedProduct:(state, action) => {
      state.items = action.payload;
    }
  },
});

export const { searchedItem, sortedItem, homeItem,filteredItem , DetailedProduct} = productSlice.actions;
export default productSlice;

 
