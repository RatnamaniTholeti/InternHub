import React, { useState, useEffect } from 'react';
import { getAllFeedbacks, deleteFeedback, updateFeedback } from '../services/api'; // Adjusted import to match the updated API functions
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAllFeedbacks();
        setFeedbacks(response);

        // Extract unique interns from feedbacks
        const uniqueInterns = [...new Set(response.map(feedback => feedback.internName))];
        setInterns(uniqueInterns);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    // Filter feedbacks based on the selected intern
    const filtered = feedbacks.filter(feedback => {
      return selectedIntern ? feedback.internName === selectedIntern : true;
    });
    setFilteredFeedbacks(filtered);
  }, [selectedIntern, feedbacks]);

  const handleEditClick = (feedback) => {
    setSelectedFeedback(feedback);
    setShowEditModal(true);
  };

  const handleDeleteClick = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteFeedback(selectedFeedback._id);
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== selectedFeedback._id));
      setFilteredFeedbacks(filteredFeedbacks.filter(feedback => feedback._id !== selectedFeedback._id));
      setShowDeleteModal(false);
      setSelectedFeedback(null); // Clear selection
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateFeedback(selectedFeedback._id, selectedFeedback);
      setShowEditModal(false);
      // Refresh the feedback list
      const response = await getAllFeedbacks();
      setFeedbacks(response);
      setFilteredFeedbacks(response);
      setSelectedFeedback(null); // Clear selection
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedFeedback(prevFeedback => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  return (
    <Container fluid>
      <h1>Feedback List</h1>

      {/* Filter Controls */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formInternFilter">
            <Form.Label>Filter by Intern</Form.Label>
            <Form.Control
              as="select"
              value={selectedIntern}
              onChange={(e) => setSelectedIntern(e.target.value)}
            >
              <option value="">All Interns</option>
              {interns.map(intern => (
                <option key={intern} value={intern}>{intern}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Intern</th>
            <th>Feedback</th>
            <th>Given By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map(feedback => (
            <tr key={feedback._id}>
              <td>{feedback.internName || 'N/A'}</td>
              <td>{feedback.feedbackText || 'N/A'}</td>
              <td>{feedback.givenBy || 'N/A'}</td>
              <td>
                <Button variant="primary" className="mr-2" onClick={() => handleEditClick(feedback)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(feedback)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {selectedFeedback && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="formFeedbackText">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  name="feedbackText"
                  value={selectedFeedback.feedbackText || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formGivenBy">
                <Form.Label>Given By</Form.Label>
                <Form.Control
                  type="text"
                  name="givenBy"
                  value={selectedFeedback.givenBy || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedFeedback && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the feedback given by {selectedFeedback.givenBy}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default FeedbackList;
