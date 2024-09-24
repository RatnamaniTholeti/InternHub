// controllers/internController.js
const Intern = require('../models/Intern'); // Ensure the path to the model is correct

// Create a new intern
const createIntern = async (req, res) => {
  try {
    const intern = new Intern(req.body);
    const newIntern = await intern.save();
    res.status(201).json(newIntern);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all interns
const getInterns = async (req, res) => {
  try {
    const interns = await Intern.find();
    res.json(interns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an intern
const updateIntern = async (req, res) => {
  try {
    const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedIntern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.json(updatedIntern);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an intern
const deleteIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.json({ message: 'Intern deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIntern,
  getInterns,
  updateIntern,
  deleteIntern,
};
