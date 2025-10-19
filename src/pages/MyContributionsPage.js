import React, { useState, useEffect, useMemo } from 'react';
import './MyContributionsPage.css'; // Your new CSS
import { FaGift, FaShoppingBasket, FaSeedling, FaClipboardCheck } from 'react-icons/fa';

const dummyContributions = [
  { id: 1, type: 'Donation', item: 'Surplus Vegetable Curry & Rice', status: 'Claimed', date: '2025-10-10' },
  { id: 2, type: 'Donation', item: 'Fresh Farm Apples', status: 'Pending Pickup', date: '2025-10-11' },
  { id: 3, type: 'Claim', item: 'Assorted Bakery Items', status: 'Completed', date: '2025-10-09' },
  { id: 4, type: 'Donation', item: 'Organic Spinach', status: 'Completed', date: '2025-10-08' },
  { id: 5, type: 'Claim', item: 'Leftover Wedding Biryani', status: 'Completed', date: '2025-10-07' },
];

// --- Sub-Components for a Cleaner Structure ---

const ImpactStatCard = ({ icon, number, label, className }) => (
  <div className="impact-card">
    <div className={`impact-icon ${className}`}>{icon}</div>
    <div className="impact-info">
      <p className="number">{number}</p>
      <p className="label">{label}</p>
    </div>
  </div>
);

const ContributionCard = ({ item }) => {
  const isDonation = item.type === 'Donation';
  const statusClass = `status-${item.status.toLowerCase().replace(' ', '-')}`;

  return (
    <div className={`contribution-card type-${item.type.toLowerCase()}`}>
      <div className={`contribution-icon ${isDonation ? 'icon-donations' : 'icon-claims'}`}>
        {isDonation ? <FaGift /> : <FaShoppingBasket />}
      </div>
      <div className="contribution-info">
        <h4>{item.item}</h4>
        <p>On: {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      <div className={`status-badge ${statusClass}`}>
        {item.status}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line"></div>
    <div className="skeleton-line short"></div>
  </div>
);

// --- Main Page Component ---
function MyContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'donation', 'claim'

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setContributions(dummyContributions);
      setIsLoading(false);
    }, 1200); // Simulate network delay
  }, []);

  // Advanced JS & React: useMemo to calculate stats only when contributions change
  const impactStats = useMemo(() => {
    return contributions.reduce((acc, item) => {
      if (item.type === 'Donation') {
        acc.donations += 1;
      } else if (item.type === 'Claim') {
        acc.claims += 1;
      }
      return acc;
    }, { donations: 0, claims: 0 });
  }, [contributions]);

  // Advanced JS & React: useMemo to efficiently filter contributions
  const filteredContributions = useMemo(() => {
    if (activeFilter === 'all') return contributions;
    return contributions.filter(
      item => item.type.toLowerCase() === activeFilter
    );
  }, [contributions, activeFilter]);

  return (
    <div className="contributions-page">
      <div className="page-header">
        <h2>My Dashboard</h2>
        <p>Here is a summary of your amazing impact on the community.</p>
      </div>

      <section className="impact-dashboard">
        <ImpactStatCard icon={<FaSeedling />} number={impactStats.donations} label="Total Food Donated" className="icon-donations" />
        <ImpactStatCard icon={<FaClipboardCheck />} number={impactStats.claims} label="Total Food Claimed" className="icon-claims" />
      </section>

      <section className="contributions-list">
        <div className="filter-controls">
          <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
          <button className={`filter-btn ${activeFilter === 'donation' ? 'active' : ''}`} onClick={() => setActiveFilter('donation')}>Donations</button>
          <button className={`filter-btn ${activeFilter === 'claim' ? 'active' : ''}`} onClick={() => setActiveFilter('claim')}>Claims</button>
        </div>

        <div className="contributions-grid">
          {isLoading ? (
            // Show skeleton loaders while data is "fetching"
            Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          ) : filteredContributions.length > 0 ? (
            // Show the filtered list of contributions
            filteredContributions.map(item => <ContributionCard key={item.id} item={item} />)
          ) : (
            // Show an empty state message if no items match the filter
            <p>No contributions found for this filter.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyContributionsPage;