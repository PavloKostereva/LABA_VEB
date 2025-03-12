// js-react/components/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InitiativesList from './components/InitiativesList';
import MyInitiatives from './components/MyInitiatives';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Доступні ініціативи</Link>
            </li>
            <li>
              <Link to="/my-initiatives">Мої ініціативи</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<InitiativesList />} />
          <Route path="/my-initiatives" element={<MyInitiatives />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
