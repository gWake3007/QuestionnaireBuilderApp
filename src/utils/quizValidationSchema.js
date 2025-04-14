import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Назва обовʼязкова'),
  description: Yup.string().required('Опис обовʼязковий'),
  theNumberOfQuestions: Yup.number().required().min(1, 'Мінімум одне питання'),

  questions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required('Питання обовʼязкове'),
        options: Yup.array()
          .of(Yup.string().required('Опція не може бути пустою'))
          .min(2, 'Мінімум 2 варіанти'),
        correctAnswer: Yup.string().required('Оберіть правильну відповідь'),
      })
    )
    .min(1, 'Додайте хоча б одне питання'),
});
