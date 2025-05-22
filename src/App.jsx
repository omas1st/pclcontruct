import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import JobSearch from './components/JobSearch';
import ApplicationForm from './components/ApplicationForm';
import SuccessPage from './components/SuccessPage';

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<JobSearch />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;