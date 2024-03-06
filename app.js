const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./auth');
const taskRoutes = require('./tasks');
const connectToDatabase = require('./db');

// Middleware
app.use(express.json());

// Connect to the database
connectToDatabase();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.set('view engine', 'ejs');

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