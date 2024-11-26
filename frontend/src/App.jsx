import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import SubmittedForms from './components/SubmittedForms';
import './App.css'
const App = () => (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/submitted" element={<SubmittedForms />} />
      </Routes>
    </div>
  </Router>
);

export default App;
