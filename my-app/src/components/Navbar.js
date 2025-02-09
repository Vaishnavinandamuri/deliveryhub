import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        {/* Company Name and Logo */}
        <div style={styles.companyName}>
          <img src="/logo.png" alt="Logo" style={styles.logo} />
          <h1 style={styles.companyTitle}>Deliveryhub</h1>
        </div>
        
        {/* Navbar Links */}
        <div style={styles.navLinks}>
          <Link style={styles.link} to="/">Ecommerce</Link>
          <Link style={styles.link} to="/party-rentals">SriKrishnaParty Rentals</Link>
        </div>
        
        {/* Search Bar */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>

        {/* Cart Icon */}
        <div style={styles.cartIcon}>
          <Link to="/cart">
            <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" alt="Cart" style={styles.cartImage} />
            {cartItemCount > 0 && <span style={styles.cartBadge}>{cartItemCount}</span>}
          </Link>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div style={styles.breadcrumbs}>
        <Link style={styles.breadcrumbLink} to="/">Home</Link> /
        <Link style={styles.breadcrumbLink} to="/ecommerce"> Ecommerce</Link> /
        <Link style={styles.breadcrumbLink} to="/grocery"> Grocery</Link>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "white",
    color: "black",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  companyName: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  companyTitle: {
    marginLeft: "10px",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  logo: {
    width: "40px",
    height: "40px",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    marginLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "1rem",
    fontWeight: "500",
  },
  searchBar: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    width: "300px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  cartIcon: {
    position: "relative",
  },
  cartImage: {
    width: "30px",
    height: "30px",
  },
  cartBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "3px 7px",
    fontSize: "0.8rem",
  },
  breadcrumbs: {
    padding: "10px 20px",
    backgroundColor: "#f8f8f8",
    color: "black",
    fontSize: "0.9rem",
    fontWeight: "400",
  },
  breadcrumbLink: {
    textDecoration: "none",
    color: "black",
    marginRight: "10px",
  },
};

export default Navbar;
