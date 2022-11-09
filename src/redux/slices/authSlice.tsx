import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICounterState {
  test: number
}


const initialState: ICounterState = {
  test: 0,
}


export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    testAction: (state, action: PayloadAction<number>) => {
      console.log(state.test);
      state.test = state.test + action.payload
    },
}
})

export const { testAction } = authSlice.actions

export default authSlice.reducer