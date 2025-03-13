import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PresenterView from './components/PresenterView';
import VoterView from './components/VoterView';
import Presentation from './components/Presentation';
import PerceptronTrainer from './components/PerceptronTrainer';
import TemperatureNeural from './components/TemperatureNeural';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/votar" element={<PresenterView />} />
        <Route path="/vote" element={<VoterView />} />
         <Route path="/" element={<Presentation />} />
         <Route path="/neuronio" element={<PerceptronTrainer />} />
         <Route path="/temperatura" element={<TemperatureNeural />} />

      </Routes>
    </Router>
  );
}

export default App;