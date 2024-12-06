import React, { useState } from 'react';
import axios from 'axios';

export default function SignupPage({ onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      setSuccess(response.data);
      setError('');
      setUsername('');
      setPassword('');
      onSignupSuccess(); // Redirect to login or show success message
    } catch (err) {
      setError(err.response ? err.response.data : 'Failed to register');
      setSuccess('');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Signup</h1>
      <form onSubmit={handleSignup} style={formStyle}>
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
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}
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

const successStyle = {
  color: 'green',
  marginTop: '1rem',
};
