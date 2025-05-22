// Frontend/pclconstru/src/components/ApplicationForm.jsx
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
      // use the full backend URL to avoid static-hosted /api collision
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/submit-application`,
        formData
      );
      if (response.data.success) {
        navigate('/success', { state: { application: response.data.data } });
      } else {
        throw new Error(response.data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Submission failed');
      console.error('Submission Error:', err);
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

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};

export default ApplicationForm;
