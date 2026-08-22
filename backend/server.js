const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API is running' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});