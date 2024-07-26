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
  const query = `
    SELECT Tm, Abbreviation, W, L, W_L_percent
    FROM TeamPitching
    WHERE Tm != 'X League Average'
    ORDER BY Abbreviation ASC;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// API route to get player data
app.get('/players', (req, res) => {
  const { playerType, team } = req.query; // team abbreviation from query parameter
  console.log('Query Parameters:', req.query);
  let query;

  switch (playerType) {
      case 'Contact':
          query = `
              SELECT Name, Username, BA as Stat1, OBP as Stat2, SLG as Stat3
              FROM hitters
              WHERE team != '${team}'
              ORDER BY BA DESC
              LIMIT 21;
          `;
          break;
      case 'Power':
          query = `
              SELECT Name, Username, BA as Stat1, OBP as Stat2, SLG as Stat3
              FROM hitters
              WHERE team != '${team}'
              ORDER BY SLG DESC
              LIMIT 21;
          `;
          break;
      case 'Best Hitter':
          query = `
              SELECT Name, Username, OPS + ISO + rOBA as Stat1, BA as Stat2, OBP as Stat3, SLG as Stat4
              FROM hitters
              WHERE team != '${team}'
              ORDER BY Stat1 DESC
              LIMIT 21;
          `;
          break;
      case 'Speedster':
          query = `
              SELECT Name, Username, OBP + sb_percent + (sb+cs) + rs_percent as Stat1, sb as Stat2 OBP as Stat3, sb_percent as Stat4
              FROM hitters
              WHERE team != '${team}'
              ORDER BY Stat1 DESC
              LIMIT 21;
          `;
          break;
      case 'Shutdown Starter':
          query = `
              SELECT Name, Username, SO9 + FIP + qs_percent - BB9 - HR9 as Stat1, SO9 as Stat2, FIP as Stat3
              FROM starters
              WHERE team != '${team}'
              ORDER BY Stat1 DESC
              LIMIT 21;
          `;
          break;
      case 'Strikeout Starter':
          query = `
              SELECT Name, Username, SO9 - BB9 as Stat1, SO9 as Stat2, BB9 as Stat3
              FROM starters
              WHERE team != '${team}'
              ORDER BY Stat1 DESC
              LIMIT 21;
          `;
          break;
      case 'Best Reliever':
          query = `
              SELECT Name, Username, SO9 + FIP - is_percent as Stat1, SO9 as Stat2, FIP as Stat3, is_percent as Stat4
              FROM relievers
              WHERE team != '${team}'
              ORDER BY Stat1 DESC
              LIMIT 21;
          `;
          break;
      case 'Best Closer':
          query = `
              SELECT Name, Username, SV + BSv + sv_percent - bsv_percent - HR9 as Stat1, SV as Stat2, sv_percent as Stat3
              FROM closers
              WHERE team != '${team}'
              ORDER BY Stat1 DESC
              LIMIT 21;
          `;
          break;
      default:
          res.status(400).send('Invalid player type');
          return;
  }

  // Execute query with the abbreviation directly inserted
  db.query(query, (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
