import React from 'react';
import TaskList from '../components/TaskList';
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

const TaskPage = () => (
  <div>
    <Header />
    <SideNav />
    <div style={styles.mainContent}>
      <TaskList />
    </div>
  </div>
);

export default TaskPage;
