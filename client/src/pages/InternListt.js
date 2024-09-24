import React from 'react';
import InternList from '../components/InternList';
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

const InternPage = () => (
  <div>
    <Header />
    <SideNav />
    <div style={styles.mainContent}>
      <InternList />
    </div>
  </div>
);

export default InternPage;
