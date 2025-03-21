import React, { useEffect } from 'react';
import { importQuizzes } from './utils/importQuizzes.js';

function App() {
  useEffect(() => {
    importQuizzes();
  }, []);

  return <h1>Quiz Catalog</h1>;
}

export default App;
