import React, { useState } from "react";
import * as XLSX from "xlsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Handle Excel file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (parsedData.length > 1) {
          const items = parsedData.slice(1).map((row, index) => ({
            id: index,
            image: row[0], // First column: Image URL
            name: row[1], // Second column: Product Name
            description: row[2], // Third column: Description
            price: row[3], // Fourth column: Price
          }));
          setProducts(items);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // Handle adding to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={styles.container}>
      <h2>Upload Grocery Product Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {products.length > 0 ? (
        products.map((product) => (
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
        <p>No products uploaded.</p>
      )}
    </div>
  );
};

// CSS Styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  productContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "20px",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  productImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "20px",
  },
  productDetails: {
    textAlign: "left",
    maxWidth: "400px",
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
