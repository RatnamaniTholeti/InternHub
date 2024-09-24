import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InternForm from './pages/InternForm';
import PerformancePage from './pages/PerformancePage';
import TaskPage from './pages/TaskPage';
import FeedbackPage from './pages/FeedbackPage';
import './App.css' ;
import InternList from './pages/InternListt';
import PerformanceForm from './pages/PerformanceForm';
import TaskForm from './pages/TaskForm';
import FeedbackForm from './pages/FeedbackForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/interns/add" element={<InternForm />} />
        <Route path="/interns" element={<InternList />} />
        <Route path="/performance/add" element={<PerformanceForm />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/tasks/add" element={<TaskForm />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/feedback/add" element={<FeedbackForm/>} />
        <Route path="/feedback" element={<FeedbackPage />} />
        

      </Routes>
    </Router>
  );
}

export default App;
