import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  id: '',
};

const alertModalSlice = createSlice({
  name: 'alertModal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.id = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const alertModalActions = alertModalSlice.actions;
export default alertModalSlice.reducer;
