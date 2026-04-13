// src/App.jsx (FINAL CODE)

import React from 'react';
import { Container } from 'react-bootstrap'; 
import { Routes, Route } from 'react-router-dom';
import InventoryManager from './pages/InventoryManager.jsx';
// Components
import Header from './components/Header.jsx'; 
import Footer from './components/Footer.jsx'; 
import ProductList from './pages/ProductList.jsx'; 

// Customer Pages
import CustomerLogin from './pages/CustomerLogin.jsx';
import CustomerSignup from './pages/CustomerSignup.jsx';

// Seller Pages
import SellerRegister from './pages/SellerRegister.jsx';
import SellerLogin from './pages/SellerLogin.jsx'; 
import SellerDashboard from './pages/SellerDashboard.jsx'; 

// Admin Pages
import AdminLogin from './pages/AdminLogin.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx'; // 🎯 NEW: Admin Dashboard Import kiya

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header /> 
      
      <main style={{ flex: 1 }}> 
        <Container>
          <Routes>
            
            {/* Main/Home Route */}
            <Route path="/" element={<ProductList />} /> 
            
            {/* Customer Routes */}
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/signup" element={<CustomerSignup />} />
            <Route path="/login" element={<CustomerLogin />} />
    <Route path="/signup" element={<CustomerSignup />} />
            {/* Seller Routes */}
            <Route path="/seller/register" element={<SellerRegister />} />
            <Route path="/seller/login" element={<SellerLogin />} /> 
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} /> 
            <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* 🎯 NEW: Admin Dashboard Route Add kiya */}
            <Route path="/seller/inventory" element={<InventoryManager />} />
          </Routes>
        </Container>
      </main>
      
      <Footer /> 
    </div>
  );
}
export default App;