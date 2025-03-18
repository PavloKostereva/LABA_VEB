import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogIn, SignUp } from './components/log_in';
import HomePage from './components/HomePage.jsx';
import About from './components/about.jsx';
import Initiatives from './components/initiatives.jsx';
import MyInitiatives from './components/my-initiatives.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/log_in" element={<LogIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/my-initiatives" element={<MyInitiatives />} />
      </Routes>
    </Router>
  </StrictMode>
);
