import * as Yup from 'yup';

const questionSchema = Yup.object().shape({
  question: Yup.string().required('Поле обовʼязкове'),
  type: Yup.string()
    .oneOf(['text', 'single', 'multiple'])
    .required('Тип запитання обовʼязковий'),
  options: Yup.array()
    .of(Yup.string())
    .when('type', {
      is: val => val === 'single' || val === 'multiple',
      then: schema =>
        schema.min(2, 'Має бути щонайменше 2 варіанти').required('Обовʼязково'),
      otherwise: schema => schema.notRequired(),
    }),
  correctAnswer: Yup.mixed().when('type', (type, schema) => {
    console.log('Running correctAnswer schema with type:', type);
    if (!type) return schema.notRequired();

    switch (type) {
      case 'text':
        return Yup.string().required('Введіть правильну відповідь');

      case 'single':
        return Yup.string()
          .required('Оберіть правильну відповідь')
          .test(
            'valid-single-option',
            'Правильна відповідь має бути серед варіантів',
            function (value) {
              const { options } = this.parent;
              return Array.isArray(options) ? options.includes(value) : false;
            }
          );

      case 'multiple':
        return Yup.array()
          .of(Yup.string())
          .min(1, 'Оберіть хоча б одну правильну відповідь')
          .test(
            'valid-multiple',
            'Правильні відповіді мають бути серед варіантів',
            function (value) {
              const { options } = this.parent;
              if (!Array.isArray(value) || !Array.isArray(options))
                return false;
              return value.every(ans => options.includes(ans));
            }
          );

      default:
        return schema.notRequired();
    }
  }),
});

export const quizSchema = Yup.object().shape({
  title: Yup.string().required('Назва обовʼязкова'),
  description: Yup.string().required('Опис обовʼязковий'),
  theNumberOfQuestions: Yup.number()
    .min(1, 'Мінімум одне питання')
    .required('Кількість питань обовʼязкова'),
  questions: Yup.array().of(questionSchema),
});
