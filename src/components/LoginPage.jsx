import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      onLogin(); // Notify App of successful login
      navigate('/shop'); // Redirect to ShopPage after login
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Login</h1>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

const containerStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: 'red',
};

const headerStyle = {
  fontSize: '2rem',
  marginBottom: '1.5rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
};

const inputStyle = {
  width: '300px',
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '1rem',
};

const errorStyle = {
  color: 'red',
  marginTop: '1rem',
};
