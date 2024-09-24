import React from 'react';
import FeedbackList from '../components/FeedbackList';
import Header from '../pages/Header';
import SideNav from '../pages/SideNav';

// Inline styles for the main content to account for fixed header and sidebar
const styles = {
  mainContent: {
    marginLeft: '220px', // Account for sidebar width
    marginTop: '60px',   // Account for header height
    padding: '1rem',
  },
};

const FeedbackPage = () => (
  <div>
    <Header />
    <SideNav />
    <div style={styles.mainContent}>
      <FeedbackList />
    </div>
  </div>
);

export default FeedbackPage;
