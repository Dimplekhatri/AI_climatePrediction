import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Features from './components/Features';
import Predictions from './components/Prediction';
import Service from './components/Service';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/feature' element={<Features />} />
        <Route path='/services' element={<Service />} />
        <Route path='/footer' element={<Contact />} />

        <Route path='/predictions' element={<Predictions />} />
      </Routes>
    </Router>
  );
};

export default App;