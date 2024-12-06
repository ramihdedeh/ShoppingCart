import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LogoutButton from './components/LogoutButton';
import axios from 'axios';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [cart, setCart] = useState([]);

  // Fetch the cart when the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      const existingProduct = cart.find((item) => item.id === product.id);
      const updatedCart = [...cart];

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity });
      }

      // Update the backend
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/cart',
        { cart: updatedCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(updatedCart); // Update local state
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== productId);

      // Update the backend
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/cart',
        { cart: updatedCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(updatedCart); // Update local state
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCart([]); // Clear cart on logout
  };

  return (
    <Router>
        <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/shop" style={linkStyle}>Shop</Link>
      {isLoggedIn ? (
        <>
          <Link to="/cart" style={linkStyle}>Cart</Link>
          <LogoutButton onLogout={handleLogout} />
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/signup" style={linkStyle}>Signup</Link>
        </>
      )}
    </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
        <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

const navStyle = {
  
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: '15.5rem',
  padding: '1rem',
  backgroundColor: '#f8f8f8',
  borderBottom: '1px solid #ddd',
  top: 0,                 // Aligns it to the top
  left: 0,
  width: '100%',
  
};

const linkStyle = {
  textDecoration: 'none',
  fontSize: '1.2rem',
  color: 'white',
  padding: '0.3rem 2rem',
  borderRadius: '20px',
  backgroundColor: 'red',
  textTransform: 'uppercase',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease, background-color 0.3s ease',
  cursor: 'pointer',
  border: 'none',
  marginLeft: '1rem',
};

linkStyle[':hover'] = {
  backgroundColor: 'darkred',
};
