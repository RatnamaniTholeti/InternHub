// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  internId: { type: mongoose.Schema.Types.ObjectId, required: true },
  internName: { type: String, required: true },
  feedbackText: { type: String, required: true },
  givenBy: { type: String, required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
