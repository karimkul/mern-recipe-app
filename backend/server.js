require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const recipeRouter = require('./routes/recipeRoute');
const connectDb = require('./config/connectionDb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Connect to the database
connectDb();

// Serve uploaded files from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', require('./routes/userRoute'));
app.use('/api/recipe', recipeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
