import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShopPage() {
  const [products, setProducts] = useState([]);

/*
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);
  */
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => {
        console.log('Products:', data); // Inspect data structure
        setProducts(data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);
  

  const addToCart = async (product, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const currentCart = response.data;

      const existingProduct = currentCart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        currentCart.push({ ...product, quantity });
      }

      await axios.post(
        'http://localhost:5000/cart',
        { cart: currentCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`${product.title} added to cart!`);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Shop</h1>
      <div style={gridStyle}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div style={cardStyle}>
      <img src={product.image} alt={product.title} style={imageStyle} />
      <div style={contentStyle}>
        <h3 style={titleStyle}>{product.title}</h3>
        <p style={priceStyle}>${Number(product.price).toFixed(2)}</p>
      </div>
      <div style={footerStyle}>
        <div style={quantityControlsStyle}>
          <button onClick={decrementQuantity} style={quantityButtonStyle}>-</button>
          <span style={quantityDisplayStyle}>{quantity}</span>
          <button onClick={incrementQuantity} style={quantityButtonStyle}>+</button>
        </div>
        <button style={buttonStyle} onClick={() => addToCart(product, quantity)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Styling
const containerStyle = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
};

const headerStyle = {
  textAlign: 'center',
  color: 'red',
  marginBottom: '2rem',
  fontSize: '2rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Creates responsive columns
  gap: '5rem', // Adds spacing between grid items
  padding: '1rem', // Optional: Adds padding to the grid container
};


const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '1.5rem',
  textAlign: 'center',
  transition: 'transform 0.2s ease, box-shadow 0.3s ease',
  height: '100%', // Ensures consistent height for all cards
};

const contentStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const footerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 'auto', // Ensures footer sticks to the bottom
  gap: '0.5rem',
};

const imageStyle = {
  width: '150px',
  height: '150px',
  objectFit: 'contain',
  marginBottom: '1rem',
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '#333',
};

const priceStyle = {
  fontSize: '1.2rem',
  color: 'green',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const quantityControlsStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
};

const quantityButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  padding: '0.5rem',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '35px',
  height: '35px',
  textAlign: 'center',
};

const quantityDisplayStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#333',
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '1rem',
  
  width: '100%', // Makes the button full width
  textTransform: 'uppercase',
};
