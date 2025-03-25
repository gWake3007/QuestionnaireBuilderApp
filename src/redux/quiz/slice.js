import { createSlice } from '@reduxjs/toolkit';
import { fetchQuizzes, addQuiz, updateQuiz, deleteQuiz } from './operations.js';

const initialState = {
  quizzesItems: [],
  status: 'idle', // idle | loading | succeeded | failed
  loading: false,
  error: null,
  selectedQuiz: null,
};

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setSelectedQuiz: (state, { payload }) => {
      state.selectedQuiz = payload;
    },
  },
  extraReducers: builder => {
    builder
      //? Take all quizzes
      .addCase(fetchQuizzes.pending, state => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.loading = false;
        state.quizzesItems = payload;
      })
      .addCase(fetchQuizzes.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.loading = false;
        state.error = payload;
      })

      //? Added quiz
      .addCase(addQuiz.pending, state => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuiz.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.loading = false;
        state.quizzesItems.push(payload);
      })
      .addCase(addQuiz.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.loading = false;
        state.error = payload;
      })

      //? Update quiz
      .addCase(updateQuiz.pending, state => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.loading = false;
        const index = state.quizzesItems.findIndex(
          quiz => quiz.id === payload.id
        );
        if (index !== -1) {
          state.quizzesItems[index] = payload;
        }
      })
      .addCase(updateQuiz.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.loading = false;
        state.error = payload;
      })

      //? Delete quiz
      .addCase(deleteQuiz.pending, state => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.loading = false;
        state.quizzesItems = state.quizzesItems.filter(
          quiz => quiz.id !== payload
        );
      })
      .addCase(deleteQuiz.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setSelectedQuiz } = quizzesSlice.actions;
export const quizessReducer = quizzesSlice.reducer;
