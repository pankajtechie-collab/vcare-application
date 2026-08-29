import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import JobDashboard from './pages/JobDashboard';
import RegisterJobChoices from './pages/RegisterJobChoices';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobDashboard />} />
        <Route path="/register-new-job-form" element={<Form />} />
        <Route path="/register-job-choices" element={<RegisterJobChoices />} />
      </Routes>
    </Router>
  );
}