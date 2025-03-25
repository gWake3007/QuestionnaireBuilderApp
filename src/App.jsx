import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizCatalog from './pages/Quiz_Catalog/Quiz_Catalog.jsx';
import CreateQuiz from './pages/Create_Quiz/Create_Quiz.jsx';
import UpdateQuiz from './pages/Update_Quiz/Update_Quiz.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizCatalog />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/update/:quizId" element={<UpdateQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
