import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Load cart from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle Excel file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError("");

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (parsedData.length > 1) {
          const items = parsedData.slice(1).map((row, index) => ({
            id: index,
            image: row[0] || "default-image-url.jpg", // Fallback image
            name: row[1] || "Unnamed Product",
            description: row[2] || "No description available",
            price: row[3] ? parseFloat(row[3]).toFixed(2) : "0.00", // Price formatting
          }));
          setProducts(items);
        } else {
          setError("The uploaded file does not contain valid product data.");
        }
      } catch (err) {
        setError("Error processing file. Ensure it's a valid Excel file.");
      }
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle adding to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>Upload Grocery Product Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBar}
      />

      <div style={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} style={styles.productContainer}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <div style={styles.productDetails}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <h3>${product.price}</h3>
                <button onClick={() => addToCart(product)} style={styles.addToCartButton}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

// CSS Styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  searchBar: {
    padding: "10px",
    margin: "10px",
    width: "80%",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  productContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    width: "250px",
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  productDetails: {
    textAlign: "center",
    marginTop: "10px",
  },
  addToCartButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default ProductList;