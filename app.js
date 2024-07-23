const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

// Serve static files from the 'public' and 'src' directories
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to get team data
app.get('/teams', (req, res) => {
  const query = 'SELECT Tm, Abbreviation, W, L FROM TeamPitching ORDER BY Abbreviation ASC'; // Updated table and sorted by Abbreviation
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
