import React from 'react';

function FoodCard({ food }) {
  const handleClaim = () => {
    alert(`You are claiming: ${food.name}`);
    // In a real app, this would trigger a backend process
  };

  return (
    <div className="food-card">
      <h3>{food.name}</h3>
      <p><strong>Quantity:</strong> {food.quantity}</p>
      <p><strong>Expires:</strong> {food.expiry}</p>
      <p><strong>Pickup Location:</strong> {food.location}</p>
      <button onClick={handleClaim}>Claim Food</button>
    </div>
  );
}

export default FoodCard;