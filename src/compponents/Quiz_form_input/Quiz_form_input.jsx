import css from './Quiz_form_input.module.css';
import { ErrorMessage, Field } from 'formik';
import { useId } from 'react';

const Quiz_form_input = ({ name, type = 'text', placeholder }) => {
  const id = useId();
  return (
    <div className={css.wrap}>
      <label className={css.label} htmlFor={`${name}${id}`}>
        {placeholder}
      </label>
      <Field
        className={css.input}
        type={type}
        name={name}
        id={`${name}${id}`}
        placeholder={placeholder}
      />
      <ErrorMessage className={css.error} name={name} component="span" />
    </div>
  );
};

export default Quiz_form_input;
