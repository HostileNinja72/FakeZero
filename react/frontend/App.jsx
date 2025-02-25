import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Remplace HashRouter par BrowserRouter
import Home from "./pages/Home";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "FakeZero"; 
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
