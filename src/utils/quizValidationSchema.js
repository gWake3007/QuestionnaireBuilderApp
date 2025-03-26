import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required("Обов'язкове поле"),
  description: Yup.string().required("Обов'язкове поле"),
  theNumberOfQuestions: Yup.number()
    .required("Обов'язкове поле")
    .min(1, 'Мінімум 1 питання'),
});
