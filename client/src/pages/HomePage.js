// HomePage.js
import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import SideNav from './SideNav';
import { FaUserCheck, FaCalendarAlt, FaComments } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import image from './download.png';

// Inline styles for the main content
const styles = {
  mainContent: {
    marginLeft: '220px', // Matches SideNav width
    marginTop: '60px',   // Matches Header height
    padding: '1rem',
    width:'1100px'
  },
  card: {
    marginBottom: '1.5rem',
  },
  cardBody: {
    textAlign: 'center',
    padding: '2rem',
  },
  overviewCard: {
    backgroundColor: '#f1f3f5',
    borderColor: '#e9ecef',
  },
  overviewCardBody: {
    padding: '1.5rem',
  },
  searchInput: {
    marginBottom: '1rem',
  },
  
};

const HomePage = () => {
  return (
    <>
      <Header />
      <SideNav />

      {/* Main Content */}
      <Container fluid style={styles.mainContent}>
      
        <Row>
          {/* Overview Section */}
          <Card style={styles.overviewCard} className="mb-3">
            <Card.Header>Overview</Card.Header>
            <Card.Body style={styles.overviewCardBody}>
              <Row>
                <Col md={3}>
                  <Card style={styles.card}>
                    <Card.Body style={styles.cardBody}>
                      <FaUserCheck size={32} color="#007bff" />
                      <h4>Active Interns</h4>
                      <p>10</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={styles.card}>
                    <Card.Body style={styles.cardBody}>
                      <FaCalendarAlt size={32} color="#28a745" />
                      <h4>Upcoming Start Dates</h4>
                      <p>5</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={styles.card}>
                    <Card.Body style={styles.cardBody}>
                      <FaCalendarAlt size={32} color="#ffc107" />
                      <h4>Upcoming End Dates</h4>
                      <p>2</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card style={styles.card}>
                    <Card.Body style={styles.cardBody}>
                      <FaComments size={32} color="#dc3545" />
                      <h4>Recent Reviews</h4>
                      <p>3</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

        <Row>
          {/* Search and Filters */}
          <Col md={9}>
            <Form.Control style={styles.searchInput} type="text" placeholder="Search..." />
          </Col>
          <Col md={3}>
            <Button variant="secondary" className="w-100">Apply Filters</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
