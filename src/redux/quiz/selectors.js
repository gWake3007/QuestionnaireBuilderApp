import { createSelector } from '@reduxjs/toolkit';
import {
  selectNumberOfQuestionsFilter,
  selectNameFilter,
} from '../filters/selectors.js';

export const selectQuizzes = state => state.quiz.quizzesItems;

export const selectLoading = state => state.quiz.loading;

export const selectError = state => state.quiz.error;

export const selectSelectedQuiz = state => state.quiz.selectedQuiz;

export const selectFilteredQuizzes = createSelector(
  [selectQuizzes, selectNumberOfQuestionsFilter, selectNameFilter],
  (quizzes, numberOfQuestionsFilter, nameFilter) =>
    quizzes.filter(
      quiz =>
        quiz.theNumberOfQuestions.includes(numberOfQuestionsFilter) &&
        quiz.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
);
