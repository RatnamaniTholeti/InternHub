import React, { useState, useEffect } from 'react';
import { getInterns, deleteIntern, updateIntern } from '../services/api'; // Ensure these functions are correctly imported
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await getInterns();
        setInterns(response.data);
        setFilteredInterns(response.data);
        // Extract unique departments
        const uniqueDepartments = [...new Set(response.data.map(intern => intern.department))];
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error('Error fetching interns:', error);
      }
    };

    fetchInterns();
  }, []);

  useEffect(() => {
    // Filter interns based on selected department
    if (selectedDepartment) {
      setFilteredInterns(interns.filter(intern => intern.department === selectedDepartment));
    } else {
      setFilteredInterns(interns);
    }
  }, [selectedDepartment, interns]);

  const handleEditClick = (intern) => {
    setSelectedIntern(intern);
    setShowEditModal(true);
  };

  const handleDeleteClick = (intern) => {
    setSelectedIntern(intern);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteIntern(selectedIntern._id);
      setInterns(interns.filter(intern => intern._id !== selectedIntern._id));
      setFilteredInterns(filteredInterns.filter(intern => intern._id !== selectedIntern._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting intern:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateIntern(selectedIntern._id, selectedIntern);
      setShowEditModal(false);
      // Refresh the intern list
      const response = await getInterns();
      setInterns(response.data);
      setFilteredInterns(response.data);
    } catch (error) {
      console.error('Error updating intern:', error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedIntern(prevIntern => ({
      ...prevIntern,
      [name]: value
    }));
  };

  return (
    <Container fluid>
      <h1>Intern List</h1>

      {/* Filter Control */}
      <Form.Group controlId="formDepartmentFilter">
        <Form.Label>Filter by Department</Form.Label>
        <Form.Control
          as="select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </Form.Control>
      </Form.Group>
              <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterns.map(intern => (
            <tr key={intern._id}>
              <td>{intern.name}</td>
              <td>{intern.contactInfo}</td>
              <td>{intern.department}</td>
              <td>
                <Button variant="primary" className="mr-2" onClick={() => handleEditClick(intern)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(intern)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {selectedIntern && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Intern</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedIntern.name || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contactInfo"
                  value={selectedIntern.contactInfo || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={selectedIntern.department || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedIntern && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {selectedIntern.name}?
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

export default InternList;
