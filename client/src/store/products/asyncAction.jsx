import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getNewProduct = createAsyncThunk('/product/newproduct', async (data, { rejectWithValue }) => {
  const response = await apis.apiGetProduct({ sort: '-createdAt' });
  // console.log("object" , response)
  if (!response.success) return rejectWithValue(response);
  return response.products;
});
