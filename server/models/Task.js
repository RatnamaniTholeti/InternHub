const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
  taskDescription: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true, enum: ['low', 'medium', 'high'] },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
