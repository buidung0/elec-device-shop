import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCurrentBlog = createAsyncThunk('/blog/newblog', async (data, { rejectWithValue }) => {
  const response = await apis.apiGetBlog();
  // console.log('>>>>>', response);
  if (!response.success) return rejectWithValue(response);
  return response.Blog;
});
