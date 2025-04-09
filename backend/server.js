const express = require('express');
const router = require('./routes/recipeRoute');
const connectDb = require('./config/connectionDb');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Data base connection
connectDb();

app.use('/api/recipe', router);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
