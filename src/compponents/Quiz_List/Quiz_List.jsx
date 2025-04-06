import css from './Quiz_List.module.css';
import QuizCard from '../Quiz_Card/Quiz_Card.jsx';
import Modal_Quiz_Card from '../Modal_Quiz_Card/Modal_Quiz_Card.jsx';
import { useSelector } from 'react-redux';
import {
  selectFilteredQuizzes,
  selectQuizzes,
} from '../../redux/quiz/selectors.js';

const Quiz_List = () => {
  const filterQuizzes = useSelector(selectFilteredQuizzes);
  const allQuizzes = useSelector(selectQuizzes);
  return (
    <>
      <ul className={css.list}>
        {filterQuizzes.map(quiz => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </ul>
      <Modal_Quiz_Card quizzes={allQuizzes} />
    </>
  );
};

export default Quiz_List;
