import { configureStore } from '@reduxjs/toolkit';
import authPopupReducer from './auth-popup/authPopupSlice';
import mainPageReducer from './main-page/mainPageSlice';

export const store = configureStore({
  reducer: {
    authPopup: authPopupReducer,
    mainPage: mainPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
