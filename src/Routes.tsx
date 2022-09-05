import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

export function AppRoutes() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={process.env.PUBLIC_URL} element={<Home />} />
      </Routes>
    </Router>
  );
}
