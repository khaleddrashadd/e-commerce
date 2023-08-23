import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  previewData: null,
};

const previewModalSlice = createSlice({
  name: 'previewModal',
  initialState,
  reducers: {
    openPreviewModal: (state, action) => {
      state.isOpen = true;
      state.previewData = action.payload;
    },
    closePreviewModal: (state) => {
      state.isOpen = false;
      state.previewData = null;
    },
  },
});

export const openPreviewModal = previewModalSlice.actions;

export default previewModalSlice.reducer;
