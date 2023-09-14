import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    context: null,
    score: 0,
    autoTanksCount: 0,
  },
  reducers: {
    updateScore: (state, action) => {
      state.score += action.payload;
    },
  },
});

export const { updateScore } = gameSlice.actions;

export default gameSlice.reducer;