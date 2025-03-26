export const selectNumberOfQuestionsFilter = state =>
  state.filters?.theNumberOfQuestions ?? '';

export const selectNameFilter = state => state.filters?.name ?? '';
