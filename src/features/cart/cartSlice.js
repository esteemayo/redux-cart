import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { openModal } from 'features/modal/modalSlice';
import { getCartItems } from 'services/cartService';

export const fetchCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const { data } = await getCartItems();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      state.cartItems.splice(
        state.cartItems.findIndex((item) => item.id === payload),
        1
      );
    },
    increase: (state, { payload }) => {
      state.cartItems.map((item) =>
        item.id === payload ? { ...item, amount: item.amount++ } : item
      );
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
    toggleAmount: (state, { payload }) => {
      if (payload.type === 'inc') {
        const cartItem = state.cartItems.find((item) => item.id === payload.id);
        cartItem.amount++;
      } else if (payload.type === 'dec') {
        const cartItem = state.cartItems.find((item) => item.id === payload.id);
        cartItem.amount--;
      }
    },
  },
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCartItems.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.cartItems = payload;
    },
    [fetchCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  calculateTotals,
  clearCart,
  decrease,
  increase,
  removeItem,
  toggleAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
