import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isOpen: true,
};
const storeModalSlice = createSlice({
  name: 'storeModal',
  initialState: initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    }
  },
});
export const storeModalActions = storeModalSlice.actions;
export default storeModalSlice.reducer;
