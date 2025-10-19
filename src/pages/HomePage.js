import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useFood } from '../context/FoodContext';
import './HomePage.css';
import { FaStore, FaTruck, FaHandHoldingHeart, FaMapMarkerAlt, FaBoxOpen } from 'react-icons/fa';

const ImpactCounter = ({ number, suffix, label }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return ( <div className="impact-stat" ref={ref}><div className="number">{inView ? <CountUp start={0} end={number} duration={2.5} /> : '0'}{suffix}</div><div className="label">{label}</div></div> );
};

const FeaturedCard = ({ item }) => {
  const navigate = useNavigate();
  const expiresIn = Math.round((new Date(item.expiresAt) - new Date()) / (1000 * 60 * 60));
  return (
    <div className="featured-card">
      <div className="featured-card-content">
        <h4>{item.title}</h4>
        <p><FaBoxOpen /> {item.quantity}</p>
        <p><FaMapMarkerAlt /> {item.location}</p>
        <div className="featured-card-footer">
          <span className="expires-tag">Expires in ~{expiresIn} hrs</span>
          <button onClick={() => navigate('/available')} className="view-details-btn">View</button>
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  const { contributions } = useFood();

  const featuredItems = useMemo(() => {
    return contributions
      .filter(item => item.status === 'Pending Pickup' && item.type === 'Donation')
      .slice(0, 3);
  }, [contributions]);

  return (
    <div className="homepage-wrapper">
      <section className="hero-container">
        <div className="hero-content">
          <h1>End Hunger, Not Food.</h1>
          <p>Join our community to rescue surplus food and deliver it to those who need it most.</p>
          <Link to="/donate" className="hero-button">Donate Food Now</Link>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Recently Added</h2>
        <p className="section-subtitle">Be the first to claim these freshly listed donations available for pickup near you.</p>
        <div className="featured-grid">
          {featuredItems.length > 0 ? (
            featuredItems.map(item => <FeaturedCard key={item.id} item={item} />)
          ) : (
            <p>No new donations at the moment. Check back soon!</p>
          )}
        </div>
      </section>

      <section className="how-it-works-section homepage-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Our process is simple, efficient, and impactful. In just three steps, you can help fight food waste and hunger.</p>
        <div className="steps-grid">
          <div className="step-card"><div className="step-icon"><FaStore /></div><h3>1. Donors List Food</h3><p>Restaurants, hotels, and individuals post details about their surplus, safe-to-eat food.</p></div>
          <div className="step-card"><div className="step-icon"><FaTruck /></div><h3>2. Volunteers Collect</h3><p>A notification is sent out, and our volunteer "Hunger Heroes" pick up the food.</p></div>
          <div className="step-card"><div className="step-icon"><FaHandHoldingHeart /></div><h3>3. Food Reaches the Needy</h3><p>The collected food is delivered to verified NGOs, shelters, and communities in need.</p></div>
        </div>
      </section>

      <section className="impact-section homepage-section">
        <h2 className="section-title">Our Impact So Far</h2>
        <p className="section-subtitle">Every donation contributes to a larger movement. See the difference we've made together.</p>
        <div className="stats-container">
          <ImpactCounter number={1250} suffix="+" label="Kgs of Food Rescued" />
          <ImpactCounter number={3000} suffix="+" label="Meals Served" />
          <ImpactCounter number={15} suffix="+" label="NGOs Partnered" />
        </div>
      </section>

      {/* --- THIS SECTION IS UPDATED TO USE TEXT NAMES --- */}
      <section className="partners-section">
        <h3>Trusted By Generous Partners Across India</h3>
        <div className="logos-marquee">
          <div className="logos-slide">
            <span className="partner-name">Zomato</span>
            <span className="partner-name">Swiggy</span>
            <span className="partner-name">Taj Hotels</span>
            <span className="partner-name">ITC Hotels</span>
          </div>
          <div className="logos-slide">
            {/* Duplicate for a seamless loop */}
            <span className="partner-name">Zomato</span>
            <span className="partner-name">Swiggy</span>
            <span className="partner-name">Taj Hotels</span>
            <span className="partner-name">ITC Hotels</span>
          </div>
        </div>
      </section>

      <section className="testimonials-section homepage-section">
        <h2 className="section-title">What Our Community Says</h2>
        <p className="section-subtitle">Hear from the people who make our mission possible every day.</p>
        <div className="testimonials-grid">
          <div className="testimonial-card"><p className="quote">"This platform made it incredibly easy to donate our surplus..."</p><p className="author">- Priya Sharma, Restaurant Owner, Delhi</p></div>
          <div className="testimonial-card"><p className="quote">"As a volunteer, I get to see the direct impact of my work..."</p><p className="author">- Arjun Kumar, Volunteer, Bangalore</p></div>
          <div className="testimonial-card"><p className="quote">"We rely on donations to feed the children at our shelter..."</p><p className="author">- Rina Das, NGO Manager, Kolkata</p></div>
        </div>
      </section>

      <section className="final-cta-section homepage-section">
        <h2 className="section-title">Become a Hunger Hero Today</h2>
        <p className="section-subtitle">Your time and vehicle can make a massive difference. Join our volunteer network.</p>
        <Link to="/volunteer-signup" className="cta-button-final">Become a Volunteer</Link>
      </section>
    </div>
  );
}

export default HomePage;