import { configureStore } from '@reduxjs/toolkit';
import storeModalSlice from './slices/store-modal-slice';

const store = configureStore({
  reducer: {
    storeModal: storeModalSlice,
  },
  devTools: true,
});
export default store;
