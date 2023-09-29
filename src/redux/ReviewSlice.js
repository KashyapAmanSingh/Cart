 import { createSlice } from '@reduxjs/toolkit';

const initialData = {
  ratings: 0,
  comment: '',
  ProductOrderId: null,
  userId: null,
};

const reviewsSlice = createSlice({
  name: 'Reviews',
  initialState: initialData,
  reducers: {
    addRatings: (state, action) => {
      state.ratings = action.payload;
      console.log( "This is slice of the ratingss ",     state.ratings,"---> ADDComment Component",action.payload );
 
     },
    addComment: (state, action) => {
      state.comment = action.payload;
     console.log( "This is slice of the comments ",  state.comment,"---> ADDComment Component",action.payload );
    },
    addProductOrderId: (state, action) => {
      state.ProductOrderId = action.payload;
      console.log( "This is slice of action.payload products   addProductOrderId ",  action.payload)
    },
    
    addUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { addRatings, addComment, addProductOrderId, addUserId } = reviewsSlice.actions;
export default reviewsSlice ;
