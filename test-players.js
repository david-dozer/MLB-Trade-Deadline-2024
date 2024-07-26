const fetch = require('node-fetch'); // Use require for node-fetch
const { URL, URLSearchParams } = require('url'); // Import URL and URLSearchParams from 'url' module

const playerType = 'Contact'; // Example playerType
const team = 'OAK'; // Example team abbreviation
const apiUrl = new URL('http://localhost:3000/players');

apiUrl.search = new URLSearchParams({ playerType, team }).toString();

fetch(apiUrl)
  .then(response => response.json())
  .then(players => {
    console.log('Players retrieved:', players);

    // Print out the names of the players
    players.forEach(player => {
      console.log(`Name: ${player.Name}`);
    });
  })
  .catch(error => {
    console.error('Error fetching players:', error);
  });
