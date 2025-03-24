import React from 'react';
import { Link } from 'react-router-dom';

const Modal_Quiz_Card = () => {
  return (
    <>
      Modal_Quiz_Card
      <Link to="/open">Run</Link>
      <Link to="/update">Edit</Link>
      <Link to="/delete">Delete</Link>
    </>
  );
};

export default Modal_Quiz_Card;
