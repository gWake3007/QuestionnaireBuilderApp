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
  [selectQuizzes, selectNameFilter, selectNumberOfQuestionsFilter],
  (quizzes, nameFilter, numberOfQuestionsFilter) =>
    quizzes.filter(
      quiz =>
        (quiz.name ?? '')
          .toLowerCase()
          .includes((nameFilter ?? '').toLowerCase()) &&
        (quiz.theNumberOfQuestions ?? '').includes(numberOfQuestionsFilter)
    )
);
