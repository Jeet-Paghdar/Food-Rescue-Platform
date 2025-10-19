import React, { createContext, useState, useContext } from 'react';

// This is the data that will be shared across the app
const initialContributions = [
  { id: 1, type: 'Donation', item: 'Surplus Vegetable Curry & Rice', status: 'Claimed', date: '2025-10-10', userId: 12, userName: 'Downtown Cafe', recipientId: 1, recipientName: 'Charity NGO' },
  { id: 2, type: 'Donation', item: 'Fresh Farm Apples', status: 'Pending Pickup', date: '2025-10-11', userId: 12, userName: 'Downtown Cafe' },
  { id: 3, type: 'Claim', item: 'Assorted Bakery Items', status: 'Completed', date: '2025-10-09', userId: 15, userName: 'The Corner Bakery', recipientId: 1, recipientName: 'Charity NGO' },
];

// Create the context
const ContributionsContext = createContext();

// Create a custom hook for easy access
export const useContributions = () => {
  return useContext(ContributionsContext);
};

// Create the Provider component that will wrap our app
export const ContributionsProvider = ({ children }) => {
  const [contributions, setContributions] = useState(initialContributions);

  const addDonation = (donationData) => {
    const newDonation = {
      id: contributions.length + 1, // Simple ID generation
      type: 'Donation',
      status: 'Pending Pickup',
      date: new Date().toISOString().split('T')[0], // Today's date
      userId: 12, // Assuming the current user is the donor
      userName: 'Downtown Cafe',
      ...donationData,
    };
    setContributions(prev => [newDonation, ...prev]);
    console.log("New donation added:", newDonation);
  };

  const addClaim = (claimedItem) => {
    const newClaim = {
      ...claimedItem,
      id: contributions.length + 1,
      type: 'Claim',
      status: 'Completed',
      recipientId: 1, // Assuming the current user is the recipient
      recipientName: 'Charity NGO',
    };
    // Update the original item's status to 'Claimed'
    setContributions(prev =>
      prev.map(item => (item.id === claimedItem.id ? { ...item, status: 'Claimed' } : item))
    );
    // Add the new claim to the history
    setContributions(prev => [newClaim, ...prev]);
    console.log("New claim added:", newClaim);
  };

  const value = {
    contributions,
    addDonation,
    addClaim,
  };

  return (
    <ContributionsContext.Provider value={value}>
      {children}
    </ContributionsContext.Provider>
  );
};