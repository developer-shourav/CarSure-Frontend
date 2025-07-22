
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface WhitelistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WhitelistState {
  items: WhitelistItem[];
}

const initialState: WhitelistState = {
  items: JSON.parse(localStorage.getItem('whitelist') || '[]'),
};

const whitelistSlice = createSlice({
  name: 'whitelist',
  initialState,
  reducers: {
    addToWhitelist: (state, action: PayloadAction<WhitelistItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
        localStorage.setItem('whitelist', JSON.stringify(state.items));
      }
    },
    removeFromWhitelist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('whitelist', JSON.stringify(state.items));
    },
  },
});

export const { addToWhitelist, removeFromWhitelist } = whitelistSlice.actions;

export const selectWhitelist = (state: RootState) => state.whitelist.items;

export default whitelistSlice.reducer;
