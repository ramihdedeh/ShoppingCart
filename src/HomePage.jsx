import React from 'react';

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to My React Shop!</h1>
      <p>
        Explore our collection of amazing products. Navigate to the Shop to add
        items to your cart.
      </p>
      <img
        src="https://via.placeholder.com/800x400"
        alt="Welcome Banner"
        style={{ width: '80%', margin: '2rem auto', borderRadius: '10px' }}
      />
    </div>
  );
}
