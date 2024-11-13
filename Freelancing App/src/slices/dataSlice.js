// // slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Baseurl from '../config/Appurl';

// Async thunk for GET request
export const fetchData = createAsyncThunk('data/freelancer', async () => {
  const response = await axios.get(`${Baseurl}/freelancer`);
  console.warn('Data fetched:', response);
  return response;

});

// Async thunk for POST request
export const postData = createAsyncThunk('data/postData', async (payload) => {
  const response = await axios.post(`${Baseurl}/your-post-endpoint`, payload);
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(postData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(postData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dataSlice.reducer;
