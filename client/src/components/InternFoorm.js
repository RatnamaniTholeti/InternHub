import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const InternFoorm = () => {
  const [internData, setInternData] = useState({
    name: '',
    contactInfo: '',
    department: '',
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setInternData({ ...internData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation to ensure all fields are filled
    if (!internData.name || !internData.contactInfo || !internData.department || !internData.startDate || !internData.endDate) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('https://internhub-server-final.vercel.app/api/interns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(internData),
      });

      const result = await response.json();
      console.log(result); // Log the response for debugging

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create intern');
      }

      setSuccess(`Intern ${result.name} created successfully!`);
      setInternData({
        name: '',
        contactInfo: '',
        department: '',
        startDate: '',
        endDate: ''
      });
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Intern</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={internData.name}
            onChange={handleChange}
            placeholder="Enter intern's name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formContactInfo">
          <Form.Label>Contact Info</Form.Label>
          <Form.Control
            type="text"
            name="contactInfo"
            value={internData.contactInfo}
            onChange={handleChange}
            placeholder="Enter contact information"
            required
          />
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            name="department"
            value={internData.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />
        </Form.Group>

        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={internData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={internData.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Intern
        </Button>
      </Form>
    </Container>
  );
};

export default InternFoorm;
