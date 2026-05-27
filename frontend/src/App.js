import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import './App.css';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';

function App() {
  const { token } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? '/dashboard':'/login'} />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to='/dashboard' />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to='/dashboard' />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" /> }/>
        <Route path="/report" element={token ? <Report /> : <Navigate to="/login" /> }/>
        
      </Routes>
    </Router>
  );
}

export default App;
