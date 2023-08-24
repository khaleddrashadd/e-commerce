import { configureStore } from '@reduxjs/toolkit';
import storeModalSlice from './slices/store-modal-slice';
import alertModalSlice from './slices/alert-modal-slice';
import previewModalSlice from './slices/preview-modal-slice';
import cartSlice from './slices/cart-slice';

const store = configureStore({
  reducer: {
    storeModal: storeModalSlice,
    alertModal: alertModalSlice,
    previewModal: previewModalSlice,
    cart: cartSlice,
  },
  devTools: true,
});
export default store;
