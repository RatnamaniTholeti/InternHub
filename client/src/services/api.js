import axios from 'axios';

// Base URL for your API
const BASE_URL = 'https://internhub-server-final.vercel.app/api';

// Intern API endpoints
const INTERN_URL = `${BASE_URL}/interns`;

// Get all interns
export const getInterns = async () => {
  const response = await axios.get(INTERN_URL);
  return response;
};

// Delete an intern by ID
export const deleteIntern = async (id) => {
  const response = await axios.delete(`${INTERN_URL}/${id}`);
  return response;
};

// Update an intern by ID
export const updateIntern = async (id, internData) => {
  const response = await axios.put(`${INTERN_URL}/${id}`, internData);
  return response;
};

// Performance API endpoints
const PERFORMANCE_URL = `${BASE_URL}/performance`;

// Fetch performance records
export const getPerformances = async () => {
  return await axios.get(PERFORMANCE_URL);
};

// Delete a performance record
export const deletePerformance = async (id) => {
  return await axios.delete(`${PERFORMANCE_URL}/${id}`);
};

// Update a performance record
export const updatePerformance = async (id, data) => {
  return await axios.put(`${PERFORMANCE_URL}/${id}`, data);
};

// Task API endpoints
const TASK_URL = `${BASE_URL}/tasks`;

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(TASK_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${TASK_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${TASK_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};

// Assign a new task
export const assignTask = async (taskData) => {
  try {
    const response = await axios.post(TASK_URL, taskData);
    return response.data;
  } catch (error) {
    throw new Error(`Error assigning task: ${error.message}`);
  }
};


// Feedback API endpoints
const FEEDBACK_URL = `${BASE_URL}/feedbacks`;

// Add new feedback
export const addFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(FEEDBACK_URL, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error adding feedback:', error.response ? error.response.data : error.message);
    throw new Error(`Error adding feedback: ${error.response ? error.response.data : error.message}`);
  }
};

// Get all feedbacks
export const getAllFeedbacks = async () => {
  try {
    const response = await axios.get(FEEDBACK_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching feedbacks: ${error.message}`);
  }
};

// Get feedbacks by internId
export const getFeedbacksByInternId = async (internId) => {
  try {
    const response = await axios.get(`${FEEDBACK_URL}/${internId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching feedbacks for intern: ${error.message}`);
  }
};

// Update feedback
export const updateFeedback = async (id, feedback) => {
  try {
    const response = await axios.put(`${FEEDBACK_URL}/${id}`, feedback);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating feedback: ${error.message}`);
  }
};

// Delete feedback
export const deleteFeedback = async (id) => {
  try {
    const response = await axios.delete(`${FEEDBACK_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting feedback: ${error.message}`);
  }
};
