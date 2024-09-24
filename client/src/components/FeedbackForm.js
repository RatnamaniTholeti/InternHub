import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { getInterns, addFeedback } from '../services/api'; // Import the correct function

const FeedbackFormm = () => {
  const [interns, setInterns] = useState([]);
  const [selectedInternId, setSelectedInternId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [givenBy, setGivenBy] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await getInterns(); // Fetch interns from API
        setInterns(response.data);
      } catch (error) {
        console.error('Error fetching interns:', error);
        setError('Failed to load interns.');
      }
    };

    fetchInterns();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedIntern = interns.find((intern) => intern._id === selectedInternId);
    const internName = selectedIntern ? selectedIntern.name : '';
  
    if (!selectedInternId || !feedbackText || !givenBy || !internName) {
      setError('Please fill in all required fields.');
      return;
    }
  
    try {
      console.log('Submitting feedback with:', {
        internId: selectedInternId,
        internName, // This should be included
        feedbackText,
        givenBy,
      });
  
      await addFeedback({
        internId: selectedInternId,
        internName, // Include intern name in the payload
        feedbackText,
        givenBy,
      });
  
      setSuccess('Feedback added successfully');
      setFeedbackText('');
      setGivenBy('');
      setSelectedInternId('');
      setError('');
    } catch (error) {
      // Log detailed error
      console.error('Error adding feedback:', error.response ? error.response.data : error.message);
      setSuccess('');
      setError(`Error adding feedback: ${error.response?.data?.message || 'An unexpected error occurred'}`);
    }
  };
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Add Feedback</h1>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formIntern">
              <Form.Label>Intern</Form.Label>
              <Form.Control
                as="select"
                value={selectedInternId}
                onChange={(e) => setSelectedInternId(e.target.value)}
                required
              >
                <option value="">Select Intern</option>
                {interns.map((intern) => (
                  <option key={intern._id} value={intern._id}>
                    {intern.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFeedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGivenBy">
              <Form.Label>Given By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={givenBy}
                onChange={(e) => setGivenBy(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Feedback
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackFormm;
