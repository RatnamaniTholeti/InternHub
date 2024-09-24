const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
  reviewDate: { type: Date, required: true },
  performance: { type: String, required: true },
});

module.exports = mongoose.model('Performance', performanceSchema);
