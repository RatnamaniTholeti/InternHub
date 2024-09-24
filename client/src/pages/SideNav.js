// SideNav.js
import React from 'react';
import { FaHome, FaUser, FaChartLine, FaClipboardList, FaComments, FaSignOutAlt } from 'react-icons/fa';

// Inline styles for sidenav
const styles = {
  navbar: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '1rem',
    height: '100vh',
    position: 'fixed',
    top: '60px', // Adjust based on the height of the header
    width: '200px',
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  navLink: {
    color: '#fff',
    display: 'block',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem',
    transition: 'background 0.2s ease-in-out',
  },
  navLinkActive: {
    backgroundColor: '#495057',
  },
};

const SideNav = () => {
  return (
    <nav style={styles.navbar}>
      <a style={styles.navLink} href="/"><FaHome className="me-2" /> Home</a>
      <a style={styles.navLink} href="/interns"><FaUser className="me-2" /> Interns</a>
      <a style={styles.navLink} href="/performance"><FaChartLine className="me-2" /> Performance</a>
      <a style={styles.navLink} href="/tasks"><FaClipboardList className="me-2" /> Tasks</a>
      <a style={styles.navLink} href="/feedback"><FaComments className="me-2" /> Feedback</a>
      <a style={styles.navLink} href=""><FaUser className="me-2" /> Profile</a>
      <a style={styles.navLink} href=""><FaSignOutAlt className="me-2" /> Logout</a>
    </nav>
  );
};

export default SideNav;
