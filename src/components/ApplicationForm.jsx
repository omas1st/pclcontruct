import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ApplicationForm.css';

const ApplicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialFilters = Object.fromEntries(new URLSearchParams(location.search));
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    ...initialFilters
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/submit-application`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      );

      if (response.data.success) {
        navigate('/success', { 
          state: { application: response.data.data },
          replace: true
        });
      } else {
        throw new Error(response.data.error || 'Server error');
      }
    } catch (err) {
      let errorMessage = 'Submission failed';
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data.error || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // No response received
        errorMessage = 'Network error - please check your internet connection';
      } else {
        // Request setup error
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('Submission Error Details:', {
        error: err,
        requestConfig: err.config,
        response: err.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <label>
        Email Address
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </label>

      <label>
        First Name
        <input
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </label>

      <label>
        Last Name
        <input
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </label>

      <label>
        Country/Region
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          disabled={loading}
        >
          <option value="">Select your country</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>
      </label>

      {error && (
        <div className="error-message">
          ⚠️ {error}
          <p>Please check your connection and try again. If problem persists, contact support.</p>
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading} 
        className={`submit-btn ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
};

export default ApplicationForm;