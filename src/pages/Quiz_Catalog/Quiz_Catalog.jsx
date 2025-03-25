import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuizzes } from '../../redux/quiz/operations.js';
import { Link } from 'react-router-dom';

const Quiz_Catalog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);
  return (
    <>
      <h1>Quiz_Catalog</h1>
      <Link to="/create">Create</Link>
    </>
  );
};

export default Quiz_Catalog;
