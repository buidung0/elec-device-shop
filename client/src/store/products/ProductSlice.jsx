import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncAction';

export const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    newProducts: null,
    errorMessage: '',
    dealDaily: null,
  },
  reducers: {
    getDealDaily: (state, action) => {
      state.dealDaily = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actions.getNewProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getNewProduct.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.newProducts = action.payload;
    });

    builder.addCase(actions.getNewProduct.rejected, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
export const { getDealDaily } = ProductSlice.actions;

export default ProductSlice.reducer;
