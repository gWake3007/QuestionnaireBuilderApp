import { FieldArray, Field, useFormikContext } from 'formik';
import styles from './QuestionsBuilder.module.css';

const QuestionsBuilder = () => {
  const { values } = useFormikContext();

  return (
    <div className={styles.wrapper}>
      <h3>Питання</h3>

      <FieldArray name="questions">
        {({ push, remove }) => (
          <div>
            {values.questions.map((question, index) => (
              <div key={index} className={styles.questionBlock}>
                <label>
                  Текст питання:
                  <Field
                    name={`questions[${index}].questionText`}
                    placeholder="Введіть питання"
                  />
                </label>

                <label>
                  Тип питання:
                  <Field as="select" name={`questions[${index}].type`}>
                    <option value="text">Текст</option>
                    <option value="single">Один варіант</option>
                    <option value="multiple">Кілька варіантів</option>
                  </Field>
                </label>

                {/* Варіанти відповідей (якщо тип не text) */}
                {question.type !== 'text' && (
                  <FieldArray name={`questions[${index}].options`}>
                    {({ push, remove }) => (
                      <div>
                        <label>Варіанти відповіді:</label>
                        {question.options?.map((option, optIndex) => (
                          <div key={optIndex} className={styles.option}>
                            <Field
                              name={`questions[${index}].options[${optIndex}]`}
                              placeholder="Варіант"
                            />
                            <button
                              type="button"
                              onClick={() => remove(optIndex)}
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={() => push('')}>
                          ➕ Додати варіант
                        </button>
                      </div>
                    )}
                  </FieldArray>
                )}

                <button type="button" onClick={() => remove(index)}>
                  🗑 Видалити питання
                </button>

                <hr />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                push({
                  questionText: '',
                  type: 'text',
                  options: [],
                })
              }
            >
              ➕ Додати питання
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default QuestionsBuilder;
