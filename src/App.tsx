import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PresenterView from './components/PresenterView';
import VoterView from './components/VoterView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PresenterView />} />
        <Route path="/vote" element={<VoterView />} />
      </Routes>
    </Router>
  );
}

export default App;