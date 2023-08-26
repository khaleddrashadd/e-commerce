import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
  isAvailable: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.changed = true;
      if (state.items.length === 0) {
        state.items.push(action.payload);
        state.totalQuantity += action.payload.quantity;
        state.totalPrice += action.payload.price * action.payload.quantity;
        return;
      }
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.totalQuantity += action.payload.quantity;
        state.totalPrice += action.payload.price * action.payload.quantity;
        existingItem.total += action.payload.total;
        return;
      }
      state.items.push(action.payload);
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },

    removeFromCart(state, action) {
      state.changed = true;
      state.isAvailable = true;
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
        return;
      }
      existingItem.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;
      existingItem.total -= existingItem.price;
    },

    removeProductFromCart(state, action) {
      state.changed = true;
      state.isAvailable = true;
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (!existingItem) return;

      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;
    },

    deleteCart(state) {
      state = initialState;
    },

    replaceCart(state, action) {
      state.changed = false;
      state.items = action.payload?.items;
      state.totalQuantity = action.payload?.totalQuantity;
      state.totalPrice = action.payload?.totalPrice;
    },

    changeAvailability(state, action) {
      state.isAvailable=true;
      state.isAvailable = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
