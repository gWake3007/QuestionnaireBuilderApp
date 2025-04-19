import { useEffect } from 'react';
import { FieldArray, Field, useFormikContext } from 'formik';
import styles from './QuestionsBuilder.module.css';

const QuestionsBuilder = () => {
  const { values, setFieldValue } = useFormikContext();
  if (!Array.isArray(values.questions)) return null;

  const getAnswerLabel = type => {
    if (type === 'text') return 'Очікувана текстова відповідь:';
    if (type === 'single') return 'Правильна відповідь (одна):';
    if (type === 'multiple') return 'Правильні відповіді:';
  };

  useEffect(() => {
    if (Array.isArray(values.questions)) {
      setFieldValue('theNumberOfQuestions', values.questions.length);
    }
  }, [values.questions, setFieldValue]);

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
                    name={`questions[${index}].question`}
                    placeholder="Введіть питання"
                    type="text"
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

                {question.type !== 'text' && (
                  <FieldArray name={`questions[${index}].options`}>
                    {({ push, remove }) => (
                      <div>
                        <label>Варіанти відповіді:</label>
                        {(question.options || []).map((option, optIndex) => (
                          <div key={optIndex} className={styles.option}>
                            <Field
                              name={`questions[${index}].options[${optIndex}]`}
                              placeholder="Варіант"
                              type="text"
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

                {/* {question.type !== 'text' && (
                  <label>
                    Правильна відповідь:
                    <Field
                      name={`questions[${index}].correctAnswer`}
                      placeholder="Введіть правильну відповідь"
                      type="text"
                    />
                  </label>
                )} */}

                {/* {question.type === 'text' && (
                  <label>
                    Очікувана текстова відповідь:
                    <Field
                      name={`questions[${index}].correctAnswer`}
                      placeholder="Введіть правильну відповідь"
                      type="text"
                    />
                  </label>
                )}

                {question.type === 'single' && (
                  <label>
                    Правильна відповідь (одна):
                    <Field
                      name={`questions[${index}].correctAnswer`}
                      placeholder="Введіть правильну відповідь"
                      type="text"
                    />
                  </label>
                )}

                {question.type === 'multiple' && (
                  <label>
                    Правильні відповіді (через кому або іншим способом):
                    <Field
                      name={`questions[${index}].correctAnswer`}
                      placeholder="Введіть правильні відповіді"
                      type="text"
                    />
                  </label>
                )} */}

                <label>
                  {getAnswerLabel(question.type)}
                  <Field
                    name={`questions[${index}].correctAnswer`}
                    placeholder="Введіть відповідь"
                    type="text"
                  />
                </label>

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
                  question: '',
                  type: 'text',
                  options: [],
                  correctAnswer: '',
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
