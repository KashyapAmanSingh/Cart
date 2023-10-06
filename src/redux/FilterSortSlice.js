import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortQuery: [],
  filteredPriceQuery: [],
  filteredCategoryQuery: [],
  filteredSearchedQuery: [],
  filteredAssured: [],
  userId: "",
};

const FilterSortSlice = createSlice({
  name: "FilterSortSlice",
  initialState,
  reducers: {
    sortedQuery: (state, action) => {
      state.sortQuery = action.payload;
      console.log("Response sortedQuery Item :", action.payload);
    },
    filteredPriceQuery: (state, action) => {
      // console.log(
      //   "Response -------- filteredPriceQuery--------   filteredItem :",
      //   action.payload
      // );
      state.filteredPriceQuery = action.payload;
    },
    filteredCategoryQuery: (state, action) => {
      // console.log(
      //   "Response filteredCategoryQuery :",
      //   action.payload
      // );
      state.filteredCategoryQuery = action.payload;
    },
    filteredSearchedQuery: (state, action) => {
      // console.log(
      //   "Response     filteredSearchedQuery :",
      //   action.payload
      // );
      state.filteredSearchedQuery = action.payload; // Update the correct field
    },

    filteredAssured: (state, action) => {
      state.filteredAssured = action.payload;
    
    },
    // userId:(state, action) => {
    //   // console.log(action.payload,"This is user Id from the Kindle");
    //   state.userId = action.payload
    // }
  },
});

export const {
  sortedQuery,
  filteredPriceQuery,
  filteredCategoryQuery,
  filteredSearchedQuery,
  filteredAssured,
} = FilterSortSlice.actions; //,userId
export default FilterSortSlice;
