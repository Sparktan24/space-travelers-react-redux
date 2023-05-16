import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/rockets';

const initialState = {
  rockets: ['value'],
};

export const getRockets = createAsyncThunk(
  'rockets/getRockets',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axios(url);
      //  console.log(resp.data);
      //  return resp.data;
      return resp.data.map((item) => [
        {
          id: item.id,
          name: item.rocket_name,
          type: item.rocket_type,
          images: item.flickr_images,
        },
        /* { id: item.id },
        { name: item.rocket_name },
        { type: item.rocket_type },
        { images: item.flickr_images }, */
      ]);
    } catch (error) {
      return rejectWithValue(error.resp.data);
    }
  },
);

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRockets.fulfilled, (state, action) => {
      //  console.log(action.payload[0].id);
      //  console.log(action.payload[0]);
      state.rockets = action.payload;
    });
  },
});

export default rocketsSlice.reducer;
