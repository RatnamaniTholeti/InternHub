const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const connectDB = require('./config/db');
const internRoutes = require('./routes/internRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const tasksRoutes = require('./routes/taskRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');


const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());  
app.use(express.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Express server!"); // Send a message to the client
  });
app.use('/api/interns', internRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/feedbacks', feedbackRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
