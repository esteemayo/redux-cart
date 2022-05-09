import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart/cartSlice';
import modalReducer from './modal/modalSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;
