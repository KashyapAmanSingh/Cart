import { createSlice } from "@reduxjs/toolkit";


let storedCartItems;
if (typeof localStorage !== 'undefined') {

  storedCartItems = localStorage.getItem("cartItems");}
const initialState = {
  items: storedCartItems ? JSON.parse(storedCartItems) : [], // Check if data is not null
  count: 0,
  session: null,
  sessionAll: [],
 
};

 

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
   
    addItem: (state, action) => {
      const { id, title, image, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
    
      if (!existingItem) {
        const newItem = { id, title, image, price, quantity: 1 };
        const updatedItems = [...state.items, newItem];
    
         localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    
        return {
          ...state,
          count: state.count + 1,  
          items: updatedItems,  
        };
      }
    
      return state;
    },
    
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      const updatedCartItems = storedCartItems.filter(
        (item) => item.id !== itemIdToRemove
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
      const updatedCount = updatedCartItems.length;

      localStorage.setItem("cartCount", JSON.stringify(updatedCount));

      return {
        ...state,
        count: updatedCount,
        items: updatedCartItems,
      };
    },

    setQuantity: (state, action) => {
      const { quantity, i } = action.payload;
      state.items[i].quantity = quantity;
    },

    setSession: (state, action) => {
      state.session = action.payload;

      if (typeof window !== "undefined") {
        const storedSessionAll = JSON.parse(localStorage.getItem("sessionAll"));
        const updatedSessionAll = [...(storedSessionAll || []), action.payload];

        state.sessionAll = updatedSessionAll;

        localStorage.setItem("sessionData", JSON.stringify(action.payload));
        localStorage.setItem("sessionAll", JSON.stringify(updatedSessionAll));
      }
    },
   
  },
});

export const { addItem, removeItem, setQuantity, setSession  } =
  cartSlice.actions;
export default cartSlice;
