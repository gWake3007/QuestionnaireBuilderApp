import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizCatalog from './pages/Quiz_Catalog/Quiz_Catalog.jsx';
import CreateQuiz from './pages/Create_Quiz/Create_Quiz.jsx';
import UpdateQuiz from './pages/Update_Quiz/Update_Quiz.jsx';
import Quiz_Page from './pages/Quiz_Page/Quiz_Page.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<QuizCatalog />} />
      <Route path="/quiz/:quizId" element={<Quiz_Page />} />
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/update/:quizId" element={<UpdateQuiz />} />
    </Routes>
  );
};

export default App;
