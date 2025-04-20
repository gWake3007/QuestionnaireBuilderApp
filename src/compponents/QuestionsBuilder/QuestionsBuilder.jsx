import { useEffect } from 'react';
import { FieldArray, Field, useFormikContext } from 'formik';
import styles from './QuestionsBuilder.module.css';

const QuestionsBuilder = () => {
  const { values, setFieldValue } = useFormikContext();
  if (!Array.isArray(values.questions)) return null;

  const getAnswerLabel = type => {
    if (type === 'text') return 'Очікувана текстова відповідь:';
    if (type === 'single') return 'Правильна відповідь (одна):';
    if (type === 'multiple') return 'Правильні відповіді (кілька):';
  };

  useEffect(() => {
    values.questions.forEach((q, index) => {
      if (
        (q.type === 'single' || q.type === 'multiple') &&
        !Array.isArray(q.options)
      ) {
        setFieldValue(`questions[${index}].options`, []);
      }
    });
  }, [values.questions, setFieldValue]);

  const toggleMultipleAnswer = (index, option) => {
    const currentAnswers = values.questions[index].correctAnswer || [];
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];

    if (updatedAnswers.length <= values.questions[index].options.length) {
      setFieldValue(`questions[${index}].correctAnswer`, updatedAnswers);
    }
  };

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
                  <Field
                    as="select"
                    name={`questions[${index}].type`}
                    onChange={e => {
                      const newType = e.target.value;
                      setFieldValue(`questions[${index}].type`, newType);
                      setFieldValue(
                        `questions[${index}].correctAnswer`,
                        newType === 'multiple' ? [] : ''
                      );
                      if (newType === 'text') {
                        setFieldValue(`questions[${index}].options`, []);
                      }
                    }}
                  >
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
                            {question.type === 'multiple' && (
                              <input
                                type="checkbox"
                                checked={
                                  Array.isArray(question.correctAnswer) &&
                                  question.correctAnswer.includes(option)
                                }
                                onChange={() =>
                                  toggleMultipleAnswer(index, option)
                                }
                              />
                            )}
                            {question.type === 'single' && (
                              <Field
                                type="radio"
                                name={`questions[${index}].correctAnswer`}
                                value={option}
                              />
                            )}
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

                {question.type === 'text' && (
                  <label>
                    {getAnswerLabel(question.type)}
                    <Field
                      name={`questions[${index}].correctAnswer`}
                      placeholder="Очікувана відповідь"
                      type="text"
                    />
                  </label>
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
