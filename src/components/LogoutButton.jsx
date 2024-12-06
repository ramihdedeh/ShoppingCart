import React from 'react';

export default function LogoutButton({ onLogout }) {
  return (
    <button onClick={onLogout} style={buttonStyle}>
      Logout
    </button>
  );
}

const buttonStyle = {
  textDecoration: 'none',
  fontSize: '1.2rem',
  color: 'white',
  padding: '0.3rem 1.5rem',
  borderRadius: '20px',
  backgroundColor: 'red',
  textTransform: 'uppercase',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease, background-color 0.3s ease',
  cursor: 'pointer',
  border: 'none',
  marginLeft: '1rem',
};

buttonStyle[':hover'] = {
  backgroundColor: 'darkred',
  transform: 'scale(1.1)',
};
