import React from 'react';

const ProductItem = ({ product }) => {
  const { name, price, imageUrl } = product;

  const addToCart = () => {
    // You could use context or Redux to manage the cart state globally
    alert(`${name} added to cart`);
  };

  return (
    <div className="product-item">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;



