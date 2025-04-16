import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectQuizzes,
  selectLoading,
  selectError,
} from '../../redux/quiz/selectors';
import { fetchQuizById } from '../../redux/quiz/operations';

const Quiz_Page = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector(selectQuizzes);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const quiz = quizzes.find(q => q.id === quizId);

  useEffect(() => {
    if (!quiz) {
      dispatch(fetchQuizById(quizId));
    }
  }, [quiz, quizId, dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!quiz) return <p>Квіз не знайдено</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to={'/'}>back</Link>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <p>
        <strong>Кількість запитань:</strong> {quiz.theNumberOfQuestions}
      </p>

      <hr />

      <h2>Запитання:</h2>
      {quiz.questions?.length > 0 ? (
        quiz.questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>
              {index + 1}. {q.question}
            </h4>
            <p>
              <strong>Тип:</strong>{' '}
              {q.type === 'text'
                ? 'Відкрита відповідь'
                : q.type === 'single'
                  ? 'Один варіант'
                  : 'Кілька варіантів'}
            </p>

            {q.type !== 'text' && q.options?.length > 0 && (
              <div>
                <p>
                  <strong>Варіанти:</strong>
                </p>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            )}

            {q.correctAnswer && (
              <p>
                <strong>Правильна відповідь:</strong> {q.correctAnswer}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>Запитань не знайдено.</p>
      )}
    </div>
  );
};

export default Quiz_Page;
