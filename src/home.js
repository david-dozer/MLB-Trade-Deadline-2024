document.addEventListener('DOMContentLoaded', () => {
    const teamContainer = document.getElementById('team-container');
  
    // Fetch team data from the server
    fetch('/teams')
      .then(response => response.json())
      .then(teams => {
        teamContainer.innerHTML = ''; // Clear any existing content
  
        // Create and append image elements for each team
        teams.forEach(team => {
          const teamElement = document.createElement('div');
          teamElement.classList.add('team');
  
          const img = document.createElement('img');
          img.src = `/logos/${team.Abbreviation}.png`; // Ensure the image file is named as the abbreviation
          img.alt = team.Tm;
          img.classList.add('team-logo');
  
          teamElement.appendChild(img);
          teamElement.addEventListener('click', () => {
            // Redirect to the player type selection screen or another action
            window.location.href = `/player-type?team=${team.Abbreviation}`;
          });
  
          teamContainer.appendChild(teamElement);
        });
      })
      .catch(error => console.error('Error fetching team data:', error));
  });
  