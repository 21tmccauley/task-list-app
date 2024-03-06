const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/task');

const router = express.Router();

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    const newTask = new Task({
      title,
      description,
      user: userId
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all tasks for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;
    const userId = req.user.userId;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    const task = await Task.findOneAndRemove({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;