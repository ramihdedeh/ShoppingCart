import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddProductPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories'); // Adjust the endpoint if needed
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/products', product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product added successfully');
       // Reset form fields after adding a product
       setTitle('');
       setDescription('');
       setPrice('');
       setImage('');
       setStock('');
       setCategory('');
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { title, description, price, image, stock, category };
    addProduct(newProduct);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Add New Product</h1>
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
          Add Product
        </button>
      </form>
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
