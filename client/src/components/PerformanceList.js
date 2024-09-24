import React, { useState, useEffect } from 'react';
import { getPerformances, deletePerformance, updatePerformance } from '../services/api'; // Ensure these functions are correctly imported
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [filteredPerformances, setFilteredPerformances] = useState([]);
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const response = await getPerformances();
        const data = response.data || [];
        setPerformances(data);
        setFilteredPerformances(data);

        // Extract unique interns, ensuring intern and intern.name are valid
        const uniqueInterns = [...new Set(data.map(performance => performance.intern ? performance.intern.name : ''))];
        setInterns(uniqueInterns.filter(name => name)); // Remove empty names
      } catch (error) {
        console.error('Error fetching performances:', error);
      }
    };

    fetchPerformances();
  }, []);

  useEffect(() => {
    // Filter performances based on selected intern
    if (selectedIntern) {
      setFilteredPerformances(performances.filter(performance => performance.intern && performance.intern.name === selectedIntern));
    } else {
      setFilteredPerformances(performances);
    }
  }, [selectedIntern, performances]);

  const handleEditClick = (performance) => {
    setSelectedPerformance(performance);
    setShowEditModal(true);
  };

  const handleDeleteClick = (performance) => {
    setSelectedPerformance(performance);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePerformance(selectedPerformance._id);
      setPerformances(performances.filter(performance => performance._id !== selectedPerformance._id));
      setFilteredPerformances(filteredPerformances.filter(performance => performance._id !== selectedPerformance._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting performance:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatePerformance(selectedPerformance._id, selectedPerformance);
      setShowEditModal(false);
      // Refresh the performance list
      const response = await getPerformances();
      const data = response.data || [];
      setPerformances(data);
      setFilteredPerformances(data);
    } catch (error) {
      console.error('Error updating performance:', error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedPerformance(prevPerformance => ({
      ...prevPerformance,
      [name]: value
    }));
  };

  return (
    <Container fluid>
      <h1>Performance List</h1>

      {/* Filter Control */}
      <Form.Group controlId="formInternFilter">
        <Form.Label>Filter by Intern</Form.Label>
        <Form.Control
          as="select"
          value={selectedIntern}
          onChange={(e) => setSelectedIntern(e.target.value)}
        >
          <option value="">All Interns</option>
          {interns.map((intern, index) => (
            <option key={index} value={intern}>{intern}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Intern Name</th>
            <th>Review Date</th>
            <th>Performance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPerformances.map(performance => (
            <tr key={performance._id}>
              <td>{performance.intern ? performance.intern.name : 'Unknown'}</td> {/* Handle null intern */}
              <td>{new Date(performance.reviewDate).toLocaleDateString()}</td>
              <td>{performance.performance}</td>
              <td>
                <Button variant="primary" className="mr-2" onClick={() => handleEditClick(performance)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(performance)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {selectedPerformance && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Performance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="formReviewDate">
                <Form.Label>Review Date</Form.Label>
                <Form.Control
                  type="date"
                  name="reviewDate"
                  value={new Date(selectedPerformance.reviewDate).toISOString().split('T')[0]}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formPerformance">
                <Form.Label>Performance</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="performance"
                  value={selectedPerformance.performance || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedPerformance && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the performance record for {selectedPerformance.intern ? selectedPerformance.intern.name : 'Unknown'}?
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

export default PerformanceList;
