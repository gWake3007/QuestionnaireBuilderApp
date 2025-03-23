// import { createSelector } from '@reduxjs/toolkit';

export const selectQuizzes = state => state.quiz.quizzesItems;

export const selectLoading = state => state.quiz.loading;

export const selectError = state => state.quiz.error;

export const selectSelectedQuiz = state => state.quiz.selectedQuiz;
