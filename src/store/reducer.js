import { combineReducers } from '@reduxjs/toolkit';
import { counterSlice } from './counterSlice';

export const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});
