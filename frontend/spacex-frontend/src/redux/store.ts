import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import capsuleReducer from './capsule';

export const store = configureStore({
  reducer: {
    capsule: capsuleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
