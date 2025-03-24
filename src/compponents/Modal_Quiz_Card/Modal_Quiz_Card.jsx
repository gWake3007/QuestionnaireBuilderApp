import css from './Modal_Quiz_Card.module.css';
import { Link } from 'react-router-dom';

const Modal_Quiz_Card = () => {
  return (
    <div className={css.modal}>
      Modal_Quiz_Card
      <ul className={css.modalList}>
        <li className={css.listItem}>
          <Link to="/open">Run</Link>
        </li>
        <li className={css.listItem}>
          <Link to="/update">Edit</Link>
        </li>
        <li className={css.listItem}>
          <Link to="/delete">Delete</Link>
        </li>
      </ul>
    </div>
  );
};

export default Modal_Quiz_Card;
