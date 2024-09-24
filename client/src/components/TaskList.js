import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/api'; // Ensure these functions are correctly imported
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        console.log('Full response:', response);

        let fetchedTasks;
        if (Array.isArray(response)) {
          fetchedTasks = response;
        } else if (Array.isArray(response.data)) {
          fetchedTasks = response.data;
        } else if (Array.isArray(response.tasks)) {
          fetchedTasks = response.tasks;
        } else {
          console.error('Unexpected response format:', response);
          fetchedTasks = [];
        }

        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);

        // Extract unique interns
        const uniqueInterns = [...new Set(fetchedTasks.map(task => task.intern.name))];
        setInterns(uniqueInterns);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
        setFilteredTasks([]);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Filter tasks based on selected filters
    const filtered = tasks.filter(task => {
      const matchesIntern = selectedIntern ? task.intern.name === selectedIntern : true;
      const matchesPriority = selectedPriority ? task.priority === selectedPriority : true;
      const matchesDueDate = dueDateFrom && dueDateTo
        ? new Date(task.dueDate) >= new Date(dueDateFrom) && new Date(task.dueDate) <= new Date(dueDateTo)
        : true;

      return matchesIntern && matchesPriority && matchesDueDate;
    });
    setFilteredTasks(filtered);
  }, [selectedIntern, selectedPriority, dueDateFrom, dueDateTo, tasks]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTask(selectedTask._id);
      setTasks(tasks.filter(task => task._id !== selectedTask._id));
      setFilteredTasks(filteredTasks.filter(task => task._id !== selectedTask._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateTask(selectedTask._id, selectedTask);
      setShowEditModal(false);
      const response = await getTasks();
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectedTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  return (
    <Container fluid>
      <h1>Task List</h1>

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
        <Col md={4}>
          <Form.Group controlId="formPriorityFilter">
            <Form.Label>Filter by Priority</Form.Label>
            <Form.Control
              as="select"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
                 </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Intern Name</th>
            <th>Task Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task._id}>
              <td>{task.intern.name || 'N/A'}</td>
              <td>{task.taskDescription}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.priority}</td>
              <td>
                <Button variant="primary" className="mr-2" onClick={() => handleEditClick(task)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(task)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {selectedTask && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="formTaskDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control
                  type="text"
                  name="taskDescription"
                  value={selectedTask.taskDescription || ''}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={new Date(selectedTask.dueDate).toISOString().split('T')[0]}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="formPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={selectedTask.priority || ''}
                  onChange={handleEditChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedTask && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the task: {selectedTask.taskDescription}?
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

export default TaskList;
