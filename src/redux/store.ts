import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teamsReducer from './slices/teamsSlice';
import playersReducer from './slices/playersSlice';
import loadingReducer from './slices/loadingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamsReducer,
    players: playersReducer,
    loading: loadingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

