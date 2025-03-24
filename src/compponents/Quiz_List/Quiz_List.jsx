import css from './Quiz_List.module.css';
import QuizCard from '../Quiz_Card/Quiz_Card.jsx';
import { useSelector } from 'react-redux';
import { selectFilteredQuizzes } from '../../redux/quiz/selectors.js';

const Quiz_List = () => {
  const filterQuizzes = useSelector(selectFilteredQuizzes);
  return (
    <ul className={css.list}>
      {filterQuizzes.map(quiz => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </ul>
  );
};

export default Quiz_List;
