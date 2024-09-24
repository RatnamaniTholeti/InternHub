// Header.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaCalendarAlt, FaUserCheck, FaTasks, FaComments } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import image from './download.png';

// Inline styles for header
const styles = {
  header: {
    backgroundColor: '#4c6ef5', // Matches the purple color
    color: '#fff',
    padding: '0.5rem 1rem',
    borderBottom: '2px solid #495057',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  quickActionsNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  image: {
    width: '150px', // Adjust this value as needed
  },
};

const Header = () => {
  return (
    <header style={styles.header}>
      <div>
        
      <Image src={image} fluid style={styles.image} />
      </div>
      <div style={styles.quickActionsNav}>
        <Button variant="outline-light" className="d-flex align-items-center gap-1" href='/interns/add'>
          <FaUserCheck /> Add Intern
        </Button>
        <Button variant="outline-light" className="d-flex align-items-center gap-1" href='/performance/add'>
          <FaCalendarAlt /> Add Performance
        </Button>
        <Button variant="outline-light" className="d-flex align-items-center gap-1" href='/tasks/add'>
          <FaTasks /> Assign Task
        </Button>
        <Button variant="outline-light" className="d-flex align-items-center gap-1" href='/feedback/add'>
          <FaComments /> Add Feedback
        </Button>
      </div>
    </header>
  );
};

export default Header;
