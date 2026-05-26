const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

dotenv.config();

const app = express();

// Connect to DB
connectDB();


// MiddleWare
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/transactions', transactionRoutes);

//Test Route
app.get('/', (req,res) => {
    res.json({message : 'Finance Tracker API is running'});
});

app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });