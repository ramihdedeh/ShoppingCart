import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // To receive product data for editing
import axios from 'axios';

export default function AddProductPage() {
  const { state } = useLocation(); // Extract state passed from AdminPage
  const editingProduct = state?.product; // Get product data if editing

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); // State to store categories

  // Populate form fields when editing a product
  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setImage(editingProduct.image);
      setStock(editingProduct.stock);
      setCategory(editingProduct.category);
    }
  }, [editingProduct]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { title, description, price, image, stock, category };

    try {
      const token = localStorage.getItem('token');

      if (editingProduct) {
        // Use PUT to update an existing product
        await axios.put(`http://localhost:5000/products/${editingProduct.id}`, product, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Product updated successfully');
      } else {
        // Use POST to create a new product
        await axios.post('http://localhost:5000/products', product, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Product added successfully');
      }

      // Reset form fields
      setTitle('');
      setDescription('');
      setPrice('');
      setImage('');
      setStock('');
      setCategory('');
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit" style={buttonStyle}>
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

// Styling (unchanged)
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

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  fontSize: '1rem',
  borderRadius: '10px',
  border: '1px solid #ddd',
};

const textareaStyle = {
  width: '100%',
  height: '80px',
  padding: '0.8rem',
  fontSize: '1rem',
  borderRadius: '10px',
  border: '1px solid #ddd',
  resize: 'none',
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  padding: '0.8rem 1.5rem',
  cursor: 'pointer',
  fontSize: '1rem',
  textTransform: 'uppercase',
  width: '100%',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};
