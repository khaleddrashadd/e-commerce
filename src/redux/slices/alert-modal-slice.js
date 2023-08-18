import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  id: '',
  itemImageUrl: '',
  itemImagesUrl:[],
};

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.id = action.payload?.itemId;
      state.itemImageUrl = action.payload?.itemImageUrl;
      state.itemImagesUrl = action.payload?.itemImagesUrl;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const alertModalActions = alertModalSlice.actions;
export default alertModalSlice.reducer;
