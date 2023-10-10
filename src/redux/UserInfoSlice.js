 import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: null,
  };
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => { 
        state.user = action.payload;
        console.log('user added',action.payload);
       },
      
  },
});

export const { addUser } = userSlice.actions;
export default userSlice ;
