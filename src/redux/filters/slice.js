import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theNumberOfQuestions: '',
  name: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNumberOfQuestionsFilter: (state, { payload }) => {
      state.theNumberOfQuestions = payload ?? '';
    },
    setNameFilter: (state, { payload }) => {
      state.name = payload ?? '';
    },
  },
});

export const { setNumberOfQuestionsFilter, setNameFilter } =
  filtersSlice.actions;

export const filterReducer = filtersSlice.reducer;
