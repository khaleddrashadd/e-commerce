import { configureStore } from '@reduxjs/toolkit';
import storeModalSlice from './slices/store-modal-slice';
import alertModalSlice from './slices/alert-modal-slice';

const store = configureStore({
  reducer: {
    storeModal: storeModalSlice,
    alertModal: alertModalSlice,
  },
  devTools: true,
});
export default store;
