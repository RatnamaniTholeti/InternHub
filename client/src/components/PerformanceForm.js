import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PerformanceFormm = () => {
  const [formData, setFormData] = useState({
    internId: '',  // Changed from internName to internId
    reviewDate: '',
    performance: '',
  });
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await fetch('https://internhub-server-final.vercel.app/api/interns');
        if (!response.ok) {
          throw new Error('Failed to fetch interns');
        }
        const data = await response.json();
        setInterns(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInterns();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://internhub-server-final.vercel.app/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create performance record');
      }

      setSuccess('Performance record created successfully!');
      setError('');

      setFormData({
        internId: '',
        reviewDate: '',
        performance: '',
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create Performance Record</h1>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formInternName">
              <Form.Label>Intern</Form.Label>
              <Form.Control
                as="select"
                name="internId"  // Changed to internId
                value={formData.internId}
                onChange={handleChange}
                required
              >
                <option value="">Select an intern</option>
                {interns.map((intern) => (
                  <option key={intern._id} value={intern._id}>
                    {intern.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReviewDate">
              <Form.Label>Review Date</Form.Label>
              <Form.Control
                type="date"
                name="reviewDate"
                value={formData.reviewDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPerformance">
              <Form.Label>Performance</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter performance review"
                name="performance"
                value={formData.performance}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Record
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PerformanceFormm;
