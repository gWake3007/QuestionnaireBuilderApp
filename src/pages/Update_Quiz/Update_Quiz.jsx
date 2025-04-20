import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuizzes } from '../../redux/quiz/selectors.js';
import { closeModal } from '../../redux/modal/slice.js';
import { updateQuiz } from '../../redux/quiz/operations.js';
import Quiz_Form from '../../compponents/Quiz_Form/Quiz_Form.jsx';

const EditQuizPage = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector(selectQuizzes);
  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) {
    return <h2>Квіз не знайдено</h2>;
  }

  const handleSubmit = async values => {
    try {
      await dispatch(updateQuiz({ id: quizId, updatedData: values })).unwrap();
      dispatch(closeModal()); // Закрити модалку, якщо вона була відкрита
      navigate('/'); // Перенаправлення на каталог
    } catch (error) {
      console.error('Update error:', error);
      // Можна додати toast або інфу для користувача
    }
  };
  return (
    <div>
      <h2>Редагувати квіз</h2>
      <Quiz_Form
        initialValues={{
          title: quiz.title,
          description: quiz.description,
          theNumberOfQuestions: quiz.theNumberOfQuestions,
          questions:
            quiz.questions.map(q => ({
              ...q,
              correctAnswer:
                q.correctAnswer ?? (q.type === 'multiple' ? [] : ''),
              options: q.options ?? [],
            })) || [],
        }}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditQuizPage;
