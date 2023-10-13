import { createSlice } from "@reduxjs/toolkit";

 
// let storedCartItems;
// let storedWishListItems; 

// if (typeof localStorage !== 'undefined') {
//   storedCartItems = localStorage.getItem("cartItems");
//   storedWishListItems = localStorage.getItem("WishList");
// }

// const initialState = {
//   items: storedCartItems ? JSON.parse(storedCartItems) : [],
//   count: 0,
//   session: null,
//   sessionAll: [],
//   wishlist: storedWishListItems ? JSON.parse(storedWishListItems):[],
// };

let storedCartItems;
 
if (typeof localStorage !== 'undefined') {
  storedCartItems = localStorage.getItem("cartItems");
 }

const initialState = {
  items: storedCartItems ? JSON.parse(storedCartItems) : [],
  count: 0,
  session: null,
  sessionAll: [],
  wishlist:  []
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
    addWishList: (state, action) => {
      if (action.payload) {
        const { _id, images, title, price, discount } = action.payload;
        console.log("Added SetWishList SLICE:--------------------------- ###################", action.payload);
    
        // Check if the item already exists in the wishlist
        const existingItem = state.wishlist.find((item) => item._id === _id);
    
        if (!existingItem) {
          const wishlistItem = { _id, title, price, discount, firstImage: images[0] };
          state.wishlist.push(wishlistItem);
    
          if (typeof window !== "undefined") {
            const storedWishList = JSON.parse(localStorage.getItem("WishList")) || [];
            const updatedWishList = [...storedWishList, wishlistItem];
            localStorage.setItem("WishList", JSON.stringify(updatedWishList));
          }
        }
      }
    },
    
    
    
 
  },
});

export const { addItem, removeItem, setQuantity, setSession,   addWishList  } =
  cartSlice.actions;
export default cartSlice;
