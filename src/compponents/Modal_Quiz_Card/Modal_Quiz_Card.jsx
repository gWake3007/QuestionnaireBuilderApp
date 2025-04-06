import css from './Modal_Quiz_Card.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuiz } from '../../redux/quiz/operations.js';
import { closeModal, openModal } from '../../redux/modal/slice.js';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Modal_Quiz_Card = ({ quizzes }) => {
  const dispatch = useDispatch();
  const { isOpen, modalType, quizId } = useSelector(state => state.modal);
  const modalRef = useRef(null);

  const quiz = quizzes.find(q => q.id === quizId);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        dispatch(closeModal());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleOutsideClick = e => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && quiz && (
        <motion.div
          className={css.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={css.modal_content}
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {modalType === 'details' ? (
              <>
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <Link to={`/quiz/${quiz.id}`}>📝 Open Quiz</Link>
                <Link to={`/update/${quiz.id}`}>✏️ Update Quiz</Link>
                <button
                  onClick={() =>
                    dispatch(
                      openModal({ type: 'confirmDelete', quizId: quiz.id })
                    )
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal_Quiz_Card;
