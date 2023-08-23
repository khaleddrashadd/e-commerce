import { configureStore } from '@reduxjs/toolkit';
import storeModalSlice from './slices/store-modal-slice';
import alertModalSlice from './slices/alert-modal-slice';
import previewModalSlice from './slices/preview-modal-slice';

const store = configureStore({
  reducer: {
    storeModal: storeModalSlice,
    alertModal: alertModalSlice,
    previewModal: previewModalSlice,
  },
  devTools: true,
});
export default store;
