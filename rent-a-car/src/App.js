
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'; // Capitalized component name
import RentCar from './pages/rentcar'; // Capitalized component name
import AboutUs from './pages/aboutus'; // Capitalized component name
import Header from './pages/header'; // Capitalized component name
import Collections from './pages/collections';
import Admin from './Admin';
import Payment from './pages/payment.js';

function App() {
  return (
    <div className="main">
      <BrowserRouter>
          <Header /> {/* Using Header component without curly braces */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rentcar" element={<RentCar />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/collections/:id" element={<Collections />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment/:id/:rate" element={<Payment />} />
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
