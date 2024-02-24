import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncAction';

export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    currentBlog: null,
    isLoading: false,
    currentStatus: [],
  },
  reducers: {
    status: (state, action) => {
      state.currentStatus = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actions.getCurrentBlog.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrentBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentBlog = action.payload;
    });

    builder.addCase(actions.getCurrentBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
// export const { } = blogSlice.actions;

export default blogSlice.reducer;
