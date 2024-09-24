const express = require('express');
const router = express.Router();
const { createIntern, getInterns, updateIntern, deleteIntern } = require('../controllers/internController');

// Define routes
router.post('/', createIntern);  // Create Intern
router.get('/', getInterns);     // Get Interns
router.put('/:id', updateIntern); // Update Intern
router.delete('/:id', deleteIntern); // Delete Intern

module.exports = router;
