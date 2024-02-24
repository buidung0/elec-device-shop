import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncAction';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    category: null,
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state, action) => {
      state.isShowCart = state.isShowCart === false ? true : false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actions.getCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    });

    builder.addCase(actions.getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
export const { showModal, showCart } = appSlice.actions;

export default appSlice.reducer;
