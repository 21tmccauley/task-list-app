const express = require('express');
const connectToDatabase = require('./db');
const authRoutes = require('./auth');
const taskRoutes = require('./tasks');

const app = express();

// Middleware
app.use(express.json());

// Connect to the database
connectToDatabase();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id });
      res.render('index', { tasks });
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});