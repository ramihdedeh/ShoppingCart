import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom'; // Keep necessary imports
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminPage from './components/AdminPage'; // Add Admin Page
import AddProductPage from './components/AddProductPage'; // Add Product Page
import LogoutButton from './components/LogoutButton';
import axios from 'axios';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role')); // Role state
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/cart',
        { cart: updatedCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(updatedCart);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserRole(localStorage.getItem('role'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        {userRole !== 'admin' && <Link to="/shop" style={linkStyle}>Shop</Link>}
        {isLoggedIn && userRole !== 'admin' && (
          <Link to="/cart" style={linkStyle}>Cart</Link>
        )}
        {isLoggedIn && userRole === 'admin' && (
          <>
            <Link to="/admin" style={linkStyle}>Admin</Link>
            <Link to="/add-product" style={linkStyle}>Add+  </Link>
          </>
        )}
        {isLoggedIn ? (
          <LogoutButton onLogout={handleLogout} />
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/shop"
          element={
            isLoggedIn && userRole !== 'admin' ? <ShopPage addToCart={addToCart} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cart"
          element={
            isLoggedIn && userRole !== 'admin' ? <CartPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin"
          element={
            isLoggedIn && userRole === 'admin' ? <AdminPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add-product"
          element={
            isLoggedIn && userRole === 'admin' ? <AddProductPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: '17.5rem',
  padding: '1rem',
  backgroundColor: '#f8f8f8',
  borderBottom: '1px solid #ddd',
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
};
