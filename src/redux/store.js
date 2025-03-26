import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modal/slice.js';
import { quizessReducer } from './quiz/slice.js';
import { filterReducer } from './filters/slice.js';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    quiz: quizessReducer,
    filters: filterReducer,
  },
});
