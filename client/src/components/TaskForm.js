import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { getInterns, assignTask } from '../services/api'; // Import the correct function


const TaskFormm = () => {
  const [formData, setFormData] = useState({
    internId: '',
    taskDescription: '',
    dueDate: '',
    priority: '',
  });
  const [interns, setInterns] = useState([]);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignTask(formData); // Call the API to assign the task
      setSuccess('Task assigned successfully!');
      setError('');
    } catch (error) {
      console.error('Error assigning task:', error);
      setError('Failed to assign task.');
      setSuccess('');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Assign Task</h1>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formInternName">
              <Form.Label>Intern</Form.Label>
              <Form.Control
                as="select"
                name="internId"
                value={formData.internId}
                onChange={handleChange}
                required
              >
                <option value="">Select Intern</option>
                {interns.map(intern => (
                  <option key={intern._id} value={intern._id}>
                    {intern.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Assign Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskFormm;
