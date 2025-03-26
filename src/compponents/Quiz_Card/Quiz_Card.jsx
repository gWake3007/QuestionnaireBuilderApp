import css from './Quiz_Card.module.css';
import { CgMenuGridO } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice.js';

const Quiz_Card = ({ quiz }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ type: 'details', quizId: quiz.id }));
  };
  return (
    <>
      Quiz_Card
      <li className={css.card}>
        <button className={css.btn} type="button" onClick={handleOpenModal}>
          OptionsModal
          <CgMenuGridO />
        </button>
        <h2 className={css.title}>{quiz.title}</h2>
        <p className={css.description}>{quiz.description}</p>
        <p className={css.question}>
          Question:<span>{quiz.length + 1}</span>
        </p>
      </li>
    </>
  );
};

export default Quiz_Card;
