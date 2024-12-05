import React from 'react';

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem',color:'red' }}>
      <h1>Welcome to My Online Shop!</h1>
      <p>
        Explore our collection of amazing products. Navigate to the Shop to add
        items to your cart.
      </p>
      <img
        src="https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2023/08/Glossary-Series-D2C-ftr-social-F5.jpg"
        alt="Welcome Banner"
        style={{ width: '50%', margin: '1rem auto', borderRadius: '30px' }}
      />
    </div>
  );
}
