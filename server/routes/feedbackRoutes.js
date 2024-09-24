const express = require('express');
const router = express.Router();
const { addFeedback, getAllFeedbacks, getFeedbacksByInternId, updateFeedback, deleteFeedback } = require('../controllers/feedbackController');

// Define routes
router.post('/', addFeedback); // Add Feedback
router.get('/', getAllFeedbacks); // Get all Feedbacks
router.get('/:internId', getFeedbacksByInternId); // Get Feedback for a specific intern
router.put('/:id', updateFeedback); // Update Feedback
router.delete('/:id', deleteFeedback); // Delete Feedback

module.exports = router;
