const Performance = require('../models/Performance'); // Adjust path if necessary

// Create a new performance record
const createPerformance = async (req, res) => {
  try {
    const { internId, reviewDate, performance } = req.body;
    
    if (!internId || !reviewDate || !performance) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPerformance = new Performance({
      intern: internId,
      reviewDate,
      performance,
    });

    const savedPerformance = await newPerformance.save();
    res.status(201).json(savedPerformance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all performance records
const getPerformances = async (req, res) => {
  try {
    const performances = await Performance.find().populate('intern');
    res.json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a performance record
const updatePerformance = async (req, res) => {
  try {
    const updatedPerformance = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPerformance) {
      return res.status(404).json({ message: 'Performance record not found' });
    }
    res.json(updatedPerformance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a performance record
const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id);
    if (!performance) {
      return res.status(404).json({ message: 'Performance record not found' });
    }
    res.json({ message: 'Performance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPerformance,
  getPerformances,
  updatePerformance,
  deletePerformance,
};
