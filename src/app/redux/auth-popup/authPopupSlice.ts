import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthPopupState } from '../../interfaces/IAuthPopupState';
import { LocalStorageProvider } from '../../services/LocalStorageProvider';
import type { RootState } from '../store';

const initialState: IAuthPopupState = {
  isShown: !LocalStorageProvider.getData()?.authData,
  apiKey: '',
};

export const authPopupSlice = createSlice({
  name: 'authPopup',
  initialState,
  reducers: {
    handleChange: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
    saveData: (state) => {
      const config = LocalStorageProvider.getData();
      if (config) {
        config.authData = state.apiKey;
        LocalStorageProvider.setData(config);
        window.history.go(0);
      }
    },
    handleIsShown: (state) => {
      state.isShown = !LocalStorageProvider.getData()?.authData;
    },
  },
});

export const { saveData, handleChange, handleIsShown } = authPopupSlice.actions;

export const selectAuthPopup = (state: RootState) => state.authPopup;

export default authPopupSlice.reducer;
