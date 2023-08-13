import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState: initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const alertModalActions = alertModalSlice.actions;
export default alertModalSlice.reducer;
