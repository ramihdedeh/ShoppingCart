import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product deleted successfully');
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // Navigate to the edit product page
  const editProduct = (product) => {
    navigate('/add-product', { state: { product } }); // Pass product data via state
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Admin Dashboard</h1>
      <div style={gridStyle}>
        {products.map((product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
            editProduct={editProduct}
          />
        ))}
      </div>
    </div>
  );
}

function AdminProductCard({ product, deleteProduct, editProduct }) {
  return (
    <div style={cardStyle}>
      <img src={product.image} alt={product.title} style={imageStyle} />
      <div style={contentStyle}>
        <h3 style={titleStyle}>{product.title}</h3>
        <p style={priceStyle}>${parseFloat(product.price).toFixed(2)}</p>
      </div>
      <button style={editButtonStyle} onClick={() => editProduct(product)}>
        Edit
      </button>
      <button style={deleteButtonStyle} onClick={() => deleteProduct(product.id)}>
        Delete
      </button>
    </div>
  );
}

// Styling (same as ShopPage where applicable)
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '5rem',
  padding: '1rem',
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
  height: '100%',
};

const contentStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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

const editButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '100%',
  textTransform: 'uppercase',
  marginBottom: '1rem', // Adds spacing between the edit button and delete button
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '100%',
  textTransform: 'uppercase',
};
