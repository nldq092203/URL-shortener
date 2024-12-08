import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RedirectPage from "./pages/RedirectPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortUrlId" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
};

export default App;