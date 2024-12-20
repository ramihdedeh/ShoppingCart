import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:5000/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data);
        calculateTotal(response.data);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };
  
    fetchCart();
  }, []);

  const calculateTotal = (cart) => {
    const totalCost = cart.reduce((acc, item) => {
      const price = item.price ? Number(item.price) : 0; // Ensure price is numeric
      const quantity = item.quantity || 1; // Default quantity to 1
      return acc + price * quantity;
    }, 0);
    setTotal(totalCost.toFixed(2)); // Ensure total is formatted correctly
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const cartItem = cart.find((item) => item.id === id);
  
      await axios.delete(`http://localhost:5000/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Update the frontend cart state
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      calculateTotal(updatedCart);
  
      alert(`${cartItem.title} removed from cart!`);
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };
  
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={emptyStyle}>Your cart is empty!</p>
      ) : (
        <div>
          <ul style={cartListStyle}>
            {cart.map((item) => {
              const price = item.price ? Number(item.price).toFixed(2) : '0.00'; // Fallback for invalid prices
              const quantity = item.quantity || 1; // Default quantity to 1
              return (
                <li key={item.id} style={cartItemStyle}>
                  <img src={item.image} alt={item.title} style={itemImageStyle} />
                  <div>
                    <h3 style={itemTitleStyle}>{item.title}</h3>
                    <p style={itemPriceStyle}>
                      ${price} x {quantity}
                    </p>
                  </div>
                  <button onClick={() => handleRemove(item.id)} style={removeButtonStyle}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <h2 style={totalStyle}>Total: ${total}</h2>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  padding: '2rem',
};

const headerStyle = {
  textAlign: 'center',
  color: 'red',
  marginBottom: '2rem',
};

const emptyStyle = {
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#666',
};

const cartListStyle = {
  listStyleType: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const cartItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #ddd',
  padding: '1rem 0',
};

const itemImageStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'contain',
};

const itemTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

const itemPriceStyle = {
  fontSize: '1rem',
  color: 'green',
};

const removeButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
};

const totalStyle = {
  textAlign: 'right',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'red',
  marginTop: '2rem',
};
