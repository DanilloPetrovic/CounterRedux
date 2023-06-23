import { createSlice } from '@reduxjs/toolkit';
import { number } from 'yup';

const initialState = {
  counter: 0,
  history: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    add(state, actions) {
      state.counter++;
      return state;
    },

    reset(state, actions) {
      state.counter = 0;
      return state;
    },

    save(state, actions) {
      const number = state.counter;
      const date = new Date().toISOString();
      const returnObject = {
        number: number,
        date: date,
      };
      state.history.push(returnObject);
      return state;
    },
  },
});
