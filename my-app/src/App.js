import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';  // Ensure ProductList is properly imported
import Cart from './components/ProductItem';
import './App.css';

const App = () => {
  const [cartItemCount, setCartItemCount] = useState(0);


  const handleAddToCart = () => {
    setCartItemCount(cartItemCount + 1); // Increment cart count
  };

  return (
    
    <Router>
      {/* Green Background Div */}
      <div style={styles.greenBackground}>
        <p style={styles.greenText}>Your local digital grocery store. Home delivery daily 5 to 8 pm</p>
      </div>

      {/* Navbar */}
      <Navbar cartItemCount={cartItemCount} />

      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={<ProductList handleAddToCart={handleAddToCart} />}  // Render ProductList on the main page
        />
        <Route path="/cart" element={<Cart />} />  // Cart route
        {/* Additional routes for Party Rentals */}
        <Route path="/party-rentals" element={<div>SriKrishnaParty Rentals Page</div>} />
      </Routes>
    </Router>
  );
};

// Inline styling for Green Background Div
const styles = {
  greenBackground: {
    backgroundColor: 'green',
    padding: '1px 0', // Padding to make it more noticeable
    textAlign: 'center',
  },
  greenText: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default App;

