import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Quiz_Form from '../../compponents/Quiz_Form/Quiz_Form.jsx';
import { addQuiz } from '../../redux/quiz/operations.js';

const CreateQuizPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    // Валідація чи є питання
    if (values.questions.length === 0) {
      alert('Додайте хоча б одне питання');
      return;
    }

    dispatch(addQuiz(values));
    resetForm();
  };

  return (
    <div>
      <Link to={'/'}>back</Link>
      <h2>Створити новий квіз</h2>
      <Quiz_Form
        initialValues={{
          title: '',
          description: '',
          theNumberOfQuestions: 0,
          questions: [],
        }}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </div>
  );
};

export default CreateQuizPage;
