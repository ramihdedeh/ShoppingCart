import React from 'react';

export default function HomePage() {
  return (
    <div style={homeStyle}>
      <h1>Welcome to My Online Shope!</h1>
      <p>Browse our amazing collection of products in the Shop page.</p>
      <img
        src="https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148553675.jpg" // Replace with your desired image URL
        alt="Welcome Banner"
        style={imageStyle}
      />
    </div>
  );
}

const homeStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: 'red',
};

const imageStyle = {
  width: '80%', // Adjust the width of the image
  maxWidth: '600px', // Ensure the image doesn’t grow too large
  borderRadius: '15px', // Optional: Adds rounded corners
  margin: '1rem auto', // Centers the image and adds spacing
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Adds a subtle shadow for styling
};
