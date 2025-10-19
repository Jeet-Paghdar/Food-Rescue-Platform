import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Import the new CSS file
import { FaUtensils, FaHandHoldingHeart, FaUsers, FaTruck } from 'react-icons/fa';

// Mock Data - In a real app, this would come from your API
const mockApiData = {
  stats: {
    totalFoodRescued: '1,250 kg',
    activeDonors: 42,
    ngosServed: 15,
    activeVolunteers: 28,
  },
  recentListings: [
    { id: 1, item: 'Fresh Vegetables', donor: 'Green Grocers, Delhi', status: 'Claimed' },
    { id: 2, item: 'Leftover Biryani (5kg)', donor: 'Paradise Hotel, Hyderabad', status: 'Delivered' },
    { id: 3, item: 'Surplus Bread & Buns', donor: 'Mumbai Bakers', status: 'Available' },
    { id: 4, item: 'Catering Extras', donor: 'Bangalore Events Co.', status: 'Available' },
  ],
  pendingVerifications: [
    { id: 101, name: 'Happy Meals Foundation', type: 'NGO' },
    { id: 102, name: 'Roti Bank, Pune', type: 'NGO' },
    { id: 103, name: 'Asha Sharma', type: 'Volunteer' },
  ],
};


function AdminPage() {
  // State to hold dashboard data
  const [stats, setStats] = useState({});
  const [recentListings, setRecentListings] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);

  // Simulate fetching data when the component mounts
  useEffect(() => {
    // In a real application, you would make an API call here
    // e.g., fetch('/api/admin/dashboard').then(...)
    setStats(mockApiData.stats);
    setRecentListings(mockApiData.recentListings);
    setPendingVerifications(mockApiData.pendingVerifications);
  }, []);

  // Get current date for the welcome message
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, Admin!</h1>
        <p>Today is {currentDate}. Here's what's happening on your platform.</p>
      </header>

      {/* --- Key Statistics --- */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-rescued"><FaUtensils /></div>
          <div className="stat-info">
            <h3>Total Food Rescued</h3>
            <p>{stats.totalFoodRescued}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-donors"><FaHandHoldingHeart /></div>
          <div className="stat-info">
            <h3>Active Donors</h3>
            <p>{stats.activeDonors}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-ngos"><FaUsers /></div>
          <div className="stat-info">
            <h3>NGOs Served</h3>
            <p>{stats.ngosServed}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-volunteers"><FaTruck /></div>
          <div className="stat-info">
            <h3>Active Volunteers</h3>
            <p>{stats.activeVolunteers}</p>
          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="main-content-grid">
        <section className="dashboard-section">
          <h2>Recent Food Listings</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Donor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentListings.map(listing => (
                <tr key={listing.id}>
                  <td>{listing.item}</td>
                  <td>{listing.donor}</td>
                  <td>
                    <span className={`status status-${listing.status.toLowerCase()}`}>
                      {listing.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="dashboard-section">
          <h2>Pending Verifications</h2>
          <ul className="verification-list">
            {pendingVerifications.map(item => (
              <li key={item.id} className="verification-item">
                <span><strong>{item.name}</strong> ({item.type})</span>
                <div className="verification-actions">
                  <button className="btn-approve">Approve</button>
                  <button className="btn-reject">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;