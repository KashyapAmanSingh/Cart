import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  detailedProduct: null, 

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
 
    },
    filteredItem: (state,action) => {
 
        state.items = action.payload;
      
    },
    homeItem: (state, action) => {
      state.items = action.payload;
      
    },
    DetailedProduct:(state, action) => {
      state.detailedProduct = action.payload;
 
    }
  },
});

export const { searchedItem, sortedItem, homeItem,filteredItem , DetailedProduct} = productSlice.actions;
export default productSlice;

 
