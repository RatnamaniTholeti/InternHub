const express = require('express');
const router = express.Router();
const { createPerformance, getPerformances, updatePerformance, deletePerformance } = require('../controllers/performanceController');

// Define routes
router.post('/', createPerformance);  // Create Performance Record
router.get('/', getPerformances);     // Get Performance Records
router.put('/:id', updatePerformance); // Update Performance Record
router.delete('/:id', deletePerformance); // Delete Performance Record

module.exports = router;
    