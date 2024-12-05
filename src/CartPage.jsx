import React from 'react';

export default function CartPage({ cart, updateCart, removeFromCart }) {
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart(productId, newQuantity);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={emptyCartStyle}>Your cart is empty! Head to the shop to add some items.</p>
      ) : (
        <div>
          <ul style={cartListStyle}>
            {cart.map((item) => (
              <li key={item.id} style={cartItemStyle}>
                <img src={item.image} alt={item.title} style={itemImageStyle} />
                <div style={itemDetailsStyle}>
                  <h3 style={itemTitleStyle}>{item.title}</h3>
                  <p style={itemPriceStyle}>Price: ${item.price.toFixed(2)}</p>
                  <div style={quantityStyle}>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} style={buttonStyle}>
                      -
                    </button>
                    <span style={quantityTextStyle}>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} style={buttonStyle}>
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={removeButtonStyle}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={totalContainerStyle}>
            <h2 style={totalStyle}>Total: ${calculateTotal()}</h2>
          </div>
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

const emptyCartStyle = {
  textAlign: 'center',
  color: '#666',
  fontSize: '1.2rem',
};

const cartListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const cartItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #ddd',
  padding: '1rem 0',
  marginBottom: '1rem',
};

const itemImageStyle = {
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  marginRight: '1rem',
  borderRadius: '10px',
};

const itemDetailsStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const itemTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
};

const itemPriceStyle = {
  color: 'green',
  fontSize: '1rem',
  marginBottom: '0.5rem',
};

const quantityStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
};

const quantityTextStyle = {
  margin: '0 1rem',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f8f9fa',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#ddd',
};

const removeButtonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

removeButtonStyle[':hover'] = {
  backgroundColor: 'darkred',
};

const totalContainerStyle = {
  textAlign: 'center',
  marginTop: '2rem',
};

const totalStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'red',
};
