import React, { createContext, useState, useContext } from 'react';

// --- ADDED a 'foodType' property to each donation ---
const initialData = [
    { id: 1, type: 'Donation', foodType: 'prepared', title: 'Surplus Vegetable Curry & Rice', quantity: '10 meals', location: 'Downtown Cafe, Pune', status: 'Pending Pickup', date: '2025-10-13', userId: 12, userName: 'Downtown Cafe', coords: [18.5204, 73.8567], expiresAt: new Date('2025-10-14T10:00:00'), imageUrl: '...' },
    { id: 2, type: 'Donation', foodType: 'bakery', title: 'Assorted Bakery Items', quantity: '2 boxes', location: 'The Corner Bakery, Pune', status: 'Pending Pickup', date: '2025-10-13', userId: 12, userName: 'Downtown Cafe', coords: [18.5314, 73.8446], expiresAt: new Date('2025-10-13T18:00:00'), imageUrl: '...' },
    { id: 3, type: 'Donation', foodType: 'produce', title: 'Fresh Organic Vegetables', quantity: '5 kg', location: 'Green Grocers, Mumbai', status: 'Claimed', date: '2025-10-12', userId: 15, userName: 'The Corner Bakery', recipientId: 1, recipientName: 'Charity NGO', coords: [19.0760, 72.8777], expiresAt: new Date('2025-10-15T18:00:00'), imageUrl: '...' },
    { id: 4, type: 'Donation', foodType: 'prepared', title: 'Paneer Butter Masala', quantity: 'Serves 8', location: 'Spice Route, Pune', status: 'Pending Pickup', date: '2025-10-13', userId: 13, userName: 'Spice Route', coords: [18.5167, 73.8562], expiresAt: new Date('2025-10-14T22:00:00'), imageUrl: '...' },
    { id: 5, type: 'Donation', foodType: 'bakery', title: 'Fresh Loaves of Bread', quantity: '15 loaves', location: 'Good Bakes, Pune', status: 'Pending Pickup', date: '2025-10-13', userId: 14, userName: 'Good Bakes', coords: [18.5249, 73.8733], expiresAt: new Date('2025-10-13T12:00:00'), imageUrl: '...' },
    { id: 6, type: 'Donation', foodType: 'prepared', title: 'Catering Leftover Biryani', quantity: 'Serves 25', location: 'Blue Diamond Hall, Pune', status: 'Pending Pickup', date: '2025-10-13', userId: 15, userName: 'Blue Diamond', coords: [18.5362, 73.8930], expiresAt: new Date('2025-10-13T16:00:00'), imageUrl: '...'},
    { id: 7, type: 'Donation', foodType: 'produce', title: 'Fresh Apples and Bananas', quantity: '10 kg', location: 'Fruit Vendor, Lavale', status: 'Pending Pickup', date: '2025-10-13', userId: 16, userName: 'Fruit Vendor', coords: [18.5214, 73.7028], expiresAt: new Date('2025-10-15T09:00:00'), imageUrl: '...'},
    { id: 8, type: 'Donation', foodType: 'prepared', title: 'Idli & Sambar', quantity: '12 plates', location: 'South Treats, Pune', status: 'Pending Pickup', date: '2025-10-13', userId: 17, userName: 'South Treats', coords: [18.5282, 73.8732], expiresAt: new Date('2025-10-13T11:00:00'), imageUrl: '...'},
];

const FoodContext = createContext();

export const useFood = () => {
  return useContext(FoodContext);
};

export const FoodProvider = ({ children }) => {
  const [contributions, setContributions] = useState(initialData);

  const addDonation = (donationData) => {
    const newDonation = {
      id: contributions.length + 5,
      type: 'Donation',
      foodType: 'prepared', // Default new donations to 'prepared'
      status: 'Pending Pickup',
      date: new Date().toISOString().split('T')[0],
      userId: 12,
      userName: 'Downtown Cafe',
      title: donationData.item,
      quantity: donationData.quantity,
      location: donationData.address,
      coords: [18.5204, 73.8567],
      expiresAt: new Date(donationData.bestBefore),
      imageUrl: 'https://images.unsplash.com/photo-1606859321382-7639d62f6b8c?q=80&w=1974&auto=format&fit=crop'
    };
    setContributions(prev => [newDonation, ...prev]);
  };

  const addClaim = (claimedItem) => {
    const newClaim = {
      ...claimedItem,
      id: contributions.length + 5,
      type: 'Claim',
      status: 'Completed',
      recipientId: 1,
      recipientName: 'Charity NGO',
    };
    setContributions(prev =>
      prev.map(item =>
        item.id === claimedItem.id ? { ...item, status: 'Claimed', recipientId: 1, recipientName: 'Charity NGO' } : item
      )
    );
    setContributions(prev => [newClaim, ...prev]);
  };

  const value = {
    contributions,
    addDonation,
    addClaim,
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  );
};