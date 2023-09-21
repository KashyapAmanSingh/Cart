import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
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

        if (typeof window !== "undefined") {
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        }

        return {
          ...state,
          count: state.count + 1,
          items: updatedItems,
        };
      }

      return state;
    },

    removeItem: (state, action) => {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.items.length) {
        state.count--;
        console.log(state.count, "  state.count  state.count");

        state.items.splice(indexToRemove, 1);

        if (typeof window !== "undefined") {
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      }
    },

    setQuantity: (state, action) => {
      const { quantity, i } = action.payload;

      state.items[i].quantity = quantity;
    },

    setSession: (state, action) => {
      state.session = action.payload;

      if (typeof window !== "undefined") {
        const storedSessionAll = JSON.parse(localStorage.getItem('sessionAll'));
        const updatedSessionAll = [...(storedSessionAll || []), action.payload];

        state.sessionAll = updatedSessionAll;

        localStorage.setItem('sessionData', JSON.stringify(action.payload));
        localStorage.setItem('sessionAll', JSON.stringify(updatedSessionAll));
      }
    },
  },
});

export const { addItem, removeItem, setQuantity, setSession } = cartSlice.actions;
export default cartSlice;

 