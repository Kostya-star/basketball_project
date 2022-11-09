import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICounterState {
  isPasswordVisible: boolean
  // isAuth: boolean 
}

const isAuthInitial = window.localStorage.getItem('isAuth')

const initialState: ICounterState = {
  isPasswordVisible: false,
  // isAuth: isAuthInitial && JSON.parse(isAuthInitial)
}


export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    onTogglePasswordVisible: (state) => {
      state.isPasswordVisible = !state.isPasswordVisible
    },
  //   onToggleIsAuth: (state) => {
  //     const isAuthIData = window.localStorage.getItem('isAuth')
  //     if(isAuthIData && JSON.parse(isAuthIData)) state.isAuth = true 
  // }
}
})

export const { onTogglePasswordVisible } = authSlice.actions

export default authSlice.reducer