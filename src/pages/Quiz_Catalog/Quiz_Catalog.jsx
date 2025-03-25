import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuizzes } from '../../redux/quiz/operations.js';
import { Link } from 'react-router-dom';
// import Quiz_List from '../../compponents/Quiz_List/Quiz_List.jsx';

const Quiz_Catalog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);
  return (
    <>
      <h1>Quiz_Catalog</h1>
      <Quiz_List />
      <Link to="/create">Create</Link>
    </>
  );
};

export default Quiz_Catalog;
