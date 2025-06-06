import css from './Quiz_Form.module.css';
import { Formik, Form } from 'formik';
import { quizSchema } from '../../utils/quizValidationSchema.js';
import Quiz_form_input from '../Quiz_form_input/Quiz_form_input.jsx';
import QuestionsBuilder from '../QuestionsBuilder/QuestionsBuilder.jsx';

const Quiz_Form = ({ initialValues, onSubmit, isEdit = false }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={quizSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Quiz_form_input name="title" type="text" placeholder="Назва квізу" />
          <Quiz_form_input
            name="description"
            type="text"
            placeholder="Опис квізу"
          />
          <QuestionsBuilder />
          <button type="submit" className={css.submitBtn}>
            {isEdit ? 'Оновити квіз' : 'Створити квіз'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Quiz_Form;
