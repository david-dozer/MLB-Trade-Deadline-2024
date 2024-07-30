document.addEventListener('DOMContentLoaded', () => {
  const teamContainer = document.getElementById('team-container');
  const teamsData = []; // JS container to store Team instances

  console.log('Fetching team data...');
  
  // Fetch team data from the server
  fetch('/teams')
      .then(response => response.json())
      .then(teams => {
          console.log('Team data fetched:', teams);
          teamContainer.innerHTML = ''; // Clear any existing content

          // Create and append image elements for each team
          teams.forEach(team => {
              console.log('Processing team:', team);
              
              const teamInstance = new Team(team.Abbreviation, team.Tm, team.W, team.L, team.W_L_percent, `/logos/${team.Abbreviation}.png`);
              
              const teamElement = document.createElement('div');
              teamElement.classList.add('team');

              const img = document.createElement('img');
              img.src = teamInstance.image; // Use the image property from the Team instance
              img.alt = teamInstance.name;
              img.classList.add('team-logo');

              teamElement.appendChild(img);
              teamElement.addEventListener('click', () => {
                // Store the team's winning percentage in localStorage
                localStorage.setItem('teamWinningPercentage', teamInstance.W_L_percent);
                console.log()
                // Redirect to the player type selection screen with team abbreviation
                window.location.href = `/player-selection.html?team=${teamInstance.abbreviation}`;
              });

              teamContainer.appendChild(teamElement);

              // Store Team instance in the JS container
              teamsData.push(teamInstance);
          });

          // Save all teams data in localStorage
          localStorage.setItem('teamsData', JSON.stringify(teamsData));
      })
      .catch(error => console.error('Error fetching team data:', error));
});
