import css from './Quiz_Card.module.css';
import { CgMenuGridO } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice.js';

const Quiz_Card = ({ quiz }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    console.log('Modal open triggered with ID:', quiz.id);
    dispatch(openModal({ type: 'details', quizId: quiz.id }));
  };
  return (
    <li className={css.card}>
      <button className={css.btn} type="button" onClick={handleOpenModal}>
        OptionsModal
        <CgMenuGridO />
      </button>
      <h2 className={css.title}>{quiz.title}</h2>
      <p className={css.description}>{quiz.description}</p>
      <p className={css.question}>
        Кількість питань:
        <span>{quiz.theNumberOfQuestions ?? 'Немає даних'}</span>
      </p>
    </li>
  );
};

export default Quiz_Card;
