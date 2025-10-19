import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FoodProvider } from './context/FoodContext';

// Components and Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DonateFoodPage from './pages/DonateFoodPage';
import AvailableFoodPage from './pages/AvailableFoodPage';
import MyContributionsPage from './pages/MyContributionsPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage'; // 1. Import the new LoginPage
import './App.css';

function App() {
  return (
    <FoodProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* 2. Add the new route for the login page */}
            <Route path="/login" element={<LoginPage />} />

            <Route path="/donate" element={<DonateFoodPage />} />
            <Route path="/available" element={<AvailableFoodPage />} />
            <Route path="/contributions" element={<MyContributionsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </FoodProvider>
  );
}

export default App;
// Issue #2: Frontend logic connected
