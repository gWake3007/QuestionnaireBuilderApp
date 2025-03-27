import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuizzes } from '../../redux/quiz/selectors.js';
import { updateQuiz } from '../../redux/quiz/operations.js';
import Quiz_Form from '../../compponents/Quiz_Form/Quiz_Form.jsx';

const EditQuizPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector(selectQuizzes);
  const quiz = quizzes.find(q => q.id === id);

  if (!quiz) {
    return <h2>Квіз не знайдено</h2>;
  }

  const handleSubmit = values => {
    dispatch(updateQuiz({ ...values, id }));
    navigate('/quizzes');
  };

  return (
    <div>
      <h2>Редагувати квіз</h2>
      <Quiz_Form
        initialValues={{
          title: quiz.title,
          description: quiz.description,
          theNumberOfQuestions: quiz.theNumberOfQuestions,
        }}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditQuizPage;
