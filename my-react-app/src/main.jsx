import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage.jsx';
import About from './components/about.jsx';
import LogIn from './components/log_in.jsx';
import Initiatives from './components/initiatives.jsx';
import My_initiatives from './components/my-initiatives.jsx';
import Sign_up from './components/sign_up.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/log_in" element={<LogIn />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/my-initiatives" element={<My_initiatives />} />
        <Route path="/sign_up" element={<Sign_up />} />
      </Routes>
    </Router>
  </StrictMode>
);
