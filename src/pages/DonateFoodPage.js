import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFood } from '../context/FoodContext'; // 1. Import the context hook
import './DonateFoodPage.css';

function DonateFoodPage() {
  const { addDonation } = useFood(); // 2. Get the addDonation function from context
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  // Updated state keys to match what the context expects ('item' instead of 'foodName')
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    bestBefore: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation(formData); // 3. Call the central function with the form data
    toast.success('Donation posted successfully!');
    navigate('/contributions'); // 4. Redirect the user to see their new contribution
  };

  const progressWidth = (step - 1) * 100 + '%';

  return (
    <div className="donate-page-wrapper">
      <div className="form-container">
        <h2>Post Surplus Food</h2>
        
        <div className="progress-bar">
          <div className="progress" style={{ width: progressWidth }}></div>
          <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <input
                  type="text"
                  id="item"
                  name="item" // Changed from 'foodName' to 'item' to match context
                  className="form-input"
                  value={formData.item}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="item" className="floating-label">Food Item(s)</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="form-input"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="quantity" className="floating-label">Quantity (e.g., 5 meals, 2 kg)</label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <input
                  type="date"
                  id="bestBefore"
                  name="bestBefore"
                  className="form-input"
                  value={formData.bestBefore}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="bestBefore" className="floating-label active">Best Before Date</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="address" className="floating-label">Pickup Address</label>
              </div>
            </div>
          )}

          <div className="form-navigation">
            <button 
              type="button" 
              className="form-btn btn-secondary" 
              onClick={prevStep} 
              disabled={step === 1}>
              Back
            </button>
            
            {step < 2 ? (
              <button 
                type="button" 
                className="form-btn btn-primary" 
                onClick={nextStep}>
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="form-btn btn-primary">
                Post Food
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default DonateFoodPage;