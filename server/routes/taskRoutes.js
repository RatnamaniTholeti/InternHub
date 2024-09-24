const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController'); // Adjust path

router.post('/', createTask); // Create task
router.get('/', getTasks); // Get all tasks
router.put('/:id', updateTask); // Update task
router.delete('/:id', deleteTask); // Delete task

module.exports = router;
