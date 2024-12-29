import React from "react";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Mail from "./components/Mail/Mail";

const App = () => {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={
          <>
            <Header />
            <Card />
            <Home />
            <Mail />
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;
