import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobSearch.css';

const JobSearch = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    sector: '',
    employmentType: ''
  });

  const cities = [
    'All', 'Antigonish', 'Aspen', 'Augusta', 'Baltimore', 'Bellevue', 'Boise',
    'Bozeman', 'Calgary', 'Cape Breton', 'Carlyle', 'Channelview', 'Charlottetown',
    'Dartmouth', 'Denver', 'Edina', 'Edmonton', 'El Paso', 'Elsa', 'Fargo',
    'Fort Lauderdale', 'Fort Saskatchewan', 'Fredericton', 'Gatineau', 'Glendale',
    'Halifax', 'Houston', 'Inuvik', 'Irvine', 'Jacksonville', 'Katy', 'Kellarna',
    'Kelowna', 'Lethbridge', 'Long Beach', 'Miami', 'Montreal', 'New Denmark Station',
    'New Orleans', 'Niagara-on-the-lake', 'Nisku', 'North Vancouver', 'Oakville',
    'Orlando', 'Ottawa', 'Phoenix', 'Portland', 'Prince Albert', 'Prince Edward Island',
    'Quebec', 'Raleigh', 'Regina', 'Richmond', 'Salt Lake City', 'San Diego',
    'San Francisco', 'San Luis Obispo', 'Sandy Lake', 'Santa Barbara', 'Saskatoon',
    'Seattle', 'Sherbrooke', 'St Petersburg', 'Sudbury', 'Sydney', 'Tampa', 'Tempe',
    'Toronto', 'Vail', 'Vancouver', 'Ventura', 'Virden', 'Winnipeg'
  ];

  const sectors = [
    'All', 'Administrative position', 'Canadian Buildings', 'Canadian Corporate',
    'Canadian Industrial', 'Financial Agent', 'Personal Assistant',
    'Remote Data Entry', 'Solar', 'US Buildings', 'US Civil',
    'US Corporate', 'US Industrial'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/application?${new URLSearchParams(filters)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="job-search-form">
      <label>Country
        <select 
          name="country"
          value={filters.country}
          onChange={(e) => setFilters({...filters, country: e.target.value})}
          required
        >
          <option>All</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Australia</option>
        </select>
      </label>

      <label>City
        <select 
          name="city"
          value={filters.city}
          onChange={(e) => setFilters({...filters, city: e.target.value})}
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </label>

      <label>Job Sector/Career
        <select 
          name="sector"
          value={filters.sector}
          onChange={(e) => setFilters({...filters, sector: e.target.value})}
        >
          {sectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </label>

      <label>Employment Type
        <select 
          name="employmentType"
          value={filters.employmentType}
          onChange={(e) => setFilters({...filters, employmentType: e.target.value})}
        >
          <option>All</option>
          <option>Contractual Full‑Time</option>
          <option>Internship Full‑Time</option>
          <option>Regular Full‑Time</option>
        </select>
      </label>

      <button type="submit" className="submit-btn">Apply</button>
    </form>
  );
};

export default JobSearch;
