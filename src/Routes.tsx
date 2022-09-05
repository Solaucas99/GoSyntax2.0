import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

export function AppRoutes() {
  return (
    <Router basename="https://solaucas99.github.io/GoSyntax2.0/">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
