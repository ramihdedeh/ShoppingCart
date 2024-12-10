import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories'); // Adjust endpoint if needed
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on the selected category
  const fetchProducts = async (category) => {
    try {
      const endpoint = category
        ? `http://localhost:5000/products/category/${category}`
        : 'http://localhost:5000/products'; // Fallback to fetch all products
      const response = await axios.get(endpoint);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Fetch products on initial load or category change
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = async (product, quantity) => {
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items are available in stock.`);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/cart',
        { productId: product.id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      alert(`${product.title} added to cart!`);
    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };
  

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Shop</h1>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <label htmlFor="category-select" style={{ marginRight: '1rem', fontSize: '1rem' }}>
          Filter by Category:
        </label>
        <select
          id="category-select"
          onChange={handleCategoryChange}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
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
      <p style={{ fontSize: '0.9rem', color: 'gray' }}>
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </p>
    </div>
      <div style={footerStyle}>
        <div style={quantityControlsStyle}>
          <button onClick={decrementQuantity} style={quantityButtonStyle}>
            -
          </button>
          <span style={quantityDisplayStyle}>{quantity}</span>
          <button onClick={incrementQuantity} style={quantityButtonStyle}>
            +
          </button>
        </div>
        <button
          style={buttonStyle}
          onClick={() => addToCart(product, quantity)}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
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
  borderRadius: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '2rem',
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
  borderRadius: '10px',

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
