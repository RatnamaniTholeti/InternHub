// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('internId', 'name'); // Populate internId with intern's name
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedbacks', error: error.message });
  }
};

// Get feedbacks by internId
const getFeedbacksByInternId = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ internId: req.params.internId }).populate('internId', 'name'); // Populate internId with intern's name
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedbacks for intern', error: error.message });
  }
};

// Add new feedback
const addFeedback = async (req, res) => {
  try {
    // Ensure all required fields are present
    const { internId, internName, feedbackText, givenBy } = req.body;
    if (!internId || !internName || !feedbackText || !givenBy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new feedback document
    const newFeedback = new Feedback({
      internId,
      internName,   // Include internName in the feedback object
      feedbackText,
      givenBy,
    });

    // Save the feedback document to the database
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(400).json({ message: 'Failed to add feedback', error: error.message });
  }
};


// Update feedback
const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('internId', 'name'); // Populate internId with intern's name
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update feedback', error: error.message });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete feedback', error: error.message });
  }
};

module.exports = {
  getAllFeedbacks,
  getFeedbacksByInternId,
  addFeedback,
  updateFeedback,
  deleteFeedback
};
