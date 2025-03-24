import React from 'react';
import { CgMenuGridO } from 'react-icons/cg';

const Quiz_Card = () => {
  return (
    <>
      Quiz_Card
      <li>
        <button type="button">
          Modal button
          <CgMenuGridO />
        </button>
        <h2>Quiz Name</h2>
        <p>Quiz Description</p>
        <p>
          Question:<span>number</span>
        </p>
      </li>
    </>
  );
};

export default Quiz_Card;
