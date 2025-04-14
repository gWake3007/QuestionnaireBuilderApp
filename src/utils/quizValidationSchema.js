import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required("Обов'язкове поле"),
  description: Yup.string().required("Обов'язкове поле"),
  theNumberOfQuestions: Yup.number().min(1, 'Мінімум 1 питання'),
  questions: Yup.array()
    .of(
      Yup.object({
        questionText: Yup.string().required('Питання обов’язкове'),
        type: Yup.string().required(),
        options: Yup.array().when('type', {
          is: val => val !== 'text',
          then: Yup.array().min(1, 'Мінімум один варіант').required(),
          otherwise: Yup.array().notRequired(),
        }),
      })
    )
    .min(1, 'Мінімум одне питання'),
});
