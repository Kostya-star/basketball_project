import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    toggleLoading(state, {payload}: PayloadAction<boolean>) {
      return payload
    }
  }
})

export const {toggleLoading} = loadingSlice.actions;

export default loadingSlice.reducer;