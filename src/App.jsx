import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import ShopPage from './ShopPage';
import CartPage from './CartPage';

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCart = (productId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/shop" style={linkStyle}>
          Shop
        </Link>
        <Link to="/cart" style={linkStyle}>
          Cart ({totalItems})
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateCart={updateCart}
              removeFromCart={removeFromCart}
            />
          }
        />
      </Routes>
    </Router>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '27rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderBottom: '1px solid #ddd',
};

const linkStyle = {
  textDecoration: 'none',
  fontSize: '1.2rem',
  
  color: 'white',
  padding: '0.3rem 2.5rem',
  border: '1px red', // Border for encadre effect
  borderRadius: '20px',
  backgroundColor: 'red',
  textTransform: 'uppercase', // Adds all-caps styling for better lettering
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adds subtle depth
  transition: 'transform 0.2s ease, background-color 0.3s ease',
};

// Hover effect added inline:
linkStyle[':hover'] = {
  backgroundColor: 'dark red',
  transform: 'scale(1.1)',
};
