const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the MLB Trade Targets 2024 API');
});

// Add more routes here to handle your specific requirements

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
