import { FieldArray, Field, useFormikContext } from 'formik';
import { useEffect } from 'react';

const defaultQuestion = {
  question: '',
  type: 'text',
  options: [],
  correctAnswer: '',
};

const QuestionsBuilder = () => {
  const { values, setFieldValue } = useFormikContext();

  // Фікс неправильних типів correctAnswer
  useEffect(() => {
    const fixedQuestions = values.questions.map(q => ({
      ...q,
      correctAnswer:
        q.type === 'multiple'
          ? Array.isArray(q.correctAnswer)
            ? q.correctAnswer
            : []
          : typeof q.correctAnswer === 'string'
            ? q.correctAnswer
            : '',
    }));
    setFieldValue('questions', fixedQuestions);
    setFieldValue('theNumberOfQuestions', values.questions.length);
  }, [values.questions.length, setFieldValue]);

  return (
    <div>
      <h3>Питання</h3>
      <FieldArray name="questions">
        {({ push, remove }) => (
          <>
            {values.questions.map((q, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  margin: '10px 0',
                  padding: '10px',
                }}
              >
                <label>Питання:</label>
                <Field
                  name={`questions[${index}].question`}
                  placeholder="Питання"
                />

                <label>Тип:</label>
                <Field as="select" name={`questions[${index}].type`}>
                  <option value="text">Текст</option>
                  <option value="single">Одна правильна</option>
                  <option value="multiple">Кілька правильних</option>
                </Field>

                {(q.type === 'single' || q.type === 'multiple') && (
                  <FieldArray name={`questions[${index}].options`}>
                    {({ push: pushOption, remove: removeOption }) => (
                      <div>
                        <label>Варіанти:</label>
                        {q.options.map((opt, i) => (
                          <div key={i}>
                            <Field
                              name={`questions[${index}].options[${i}]`}
                              placeholder={`Варіант ${i + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(i)}
                            >
                              Видалити
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={() => pushOption('')}>
                          + Додати варіант
                        </button>
                      </div>
                    )}
                  </FieldArray>
                )}

                <label>Правильна відповідь:</label>
                {q.type === 'text' && (
                  <Field
                    name={`questions[${index}].correctAnswer`}
                    placeholder="Правильна відповідь"
                  />
                )}
                {q.type === 'single' && (
                  <Field as="select" name={`questions[${index}].correctAnswer`}>
                    <option value="">-- Оберіть варіант --</option>
                    {q.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                )}
                {q.type === 'multiple' && Array.isArray(q.correctAnswer) && (
                  <FieldArray name={`questions[${index}].correctAnswer`}>
                    {({ push: pushAns, remove: removeAns }) => (
                      <div>
                        {q.options.map((opt, i) => {
                          const isChecked = q.correctAnswer.includes(opt);
                          return (
                            <label key={i}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    const idx = q.correctAnswer.indexOf(opt);
                                    removeAns(idx);
                                  } else {
                                    pushAns(opt);
                                  }
                                }}
                              />
                              {opt || `Варіант ${i + 1}`}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </FieldArray>
                )}

                <button type="button" onClick={() => remove(index)}>
                  Видалити питання
                </button>
              </div>
            ))}

            <button type="button" onClick={() => push(defaultQuestion)}>
              + Додати питання
            </button>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default QuestionsBuilder;
