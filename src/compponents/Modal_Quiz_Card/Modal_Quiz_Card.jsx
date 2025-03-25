import css from './Modal_Quiz_Card.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalState } from '../../redux/modal/selectors.js';
import { deleteQuiz } from '../../redux/quiz/operations.js';
import { closeModal, openModal } from '../../redux/modal/slice.js';
import { Link } from 'react-router-dom';

const Modal_Quiz_Card = ({ quizzes }) => {
  const dispatch = useDispatch();
  const { isOpen, modalType, quizId } = useSelector(selectModalState);

  if (!isOpen) return null;

  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) return null;
  return (
    <div className={css.modal}>
      <div className="modal-content">
        {modalType === 'details' ? (
          <>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <Link to={`/quiz/${quiz.id}`}>📝 Open Quiz</Link>
            <Link to={`/update/${quiz.id}`}>✏️ Update Quiz</Link>
            <button
              onClick={() =>
                dispatch(openModal({ type: 'confirmDelete', quizId: quiz.id }))
              }
            >
              🗑️ Delete
            </button>
            <button onClick={() => dispatch(closeModal())}>❌ Close</button>
          </>
        ) : modalType === 'confirmDelete' ? (
          <>
            <h3>Ви впевнені, що хочете видалити цей квіз?</h3>
            <button
              onClick={() => {
                dispatch(deleteQuiz(quizId));
                dispatch(closeModal());
              }}
            >
              ✅ Так
            </button>
            <button onClick={() => dispatch(closeModal())}>❌ Ні</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Modal_Quiz_Card;
