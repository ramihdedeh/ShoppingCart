import React, { useState, useEffect } from 'react';

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div style={cardStyle}>
      <img src={product.image} alt={product.title} style={imageStyle} />
      <h3 style={titleStyle}>{product.title}</h3>
      <p style={priceStyle}>${product.price.toFixed(2)}</p>
      <div style={quantityStyle}>
        <button onClick={decrementQuantity} style={buttonStyle}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          style={inputStyle}
        />
        <button onClick={incrementQuantity} style={buttonStyle}>+</button>
      </div>
      <button onClick={() => addToCart(product, quantity)} style={addButtonStyle}>
        Add To Cart
      </button>
    </div>
  );
}

export default function ShopPage({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      
      <div style={gridStyle}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

// Styles
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  padding: '2rem',
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '1rem',
  textAlign: 'center',
  backgroundColor: '#fff',
  transition: 'transform 0.2s ease, box-shadow 0.3s ease',
};

const imageStyle = {
  width: '150px',
  height: '150px',
  objectFit: 'contain',
  margin: '0 auto 1rem',
  borderRadius: '10px',
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  margin: '0.5rem 0',
};

const priceStyle = {
  fontSize: '1rem',
  color: 'green',
  margin: '0.5rem 0',
};

const quantityStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0.5rem 0',
};

const buttonStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#f8f9fa',
};

const inputStyle = {
  width: '50px',
  textAlign: 'center',
  margin: '0 0.5rem',
  padding: '0.25rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const addButtonStyle = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: 'red',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

addButtonStyle[':hover'] = {
  backgroundColor: 'darkred',
};

const headerStyle = {
  textAlign: 'center',
  color: 'red',
  margin: '2rem 0',
};
