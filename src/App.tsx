import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterGrid from './pages/CharacterGrid';
import CharacterProfile from './components/CharacterProfile';
import LocationGrid from './pages/LocationGrid';
import EpisodeGrid from './pages/EpisodeGrid';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterGrid />} />
        <Route path="/character/:id" element={<CharacterProfile />} />
        <Route path="/locations" element={<LocationGrid />} />
        <Route path="/episodes" element={<EpisodeGrid />} />
      </Routes>
    </Router>
  );
};

export default App;
