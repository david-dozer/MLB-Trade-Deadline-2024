document.addEventListener('DOMContentLoaded', () => {
    const playerType = localStorage.getItem('playerType');
    const teamAbbr = localStorage.getItem('selectedTeam');

    // Fetch player data from server
    fetch(`/players/${playerType}`)
        .then(response => response.json())
        .then(players => {
            // Assuming you have logic to select the best player
            const bestPlayer = players[0]; // Replace with your actual logic

            document.getElementById('player-image').src = `/logos/${bestPlayer.Image}`;
            document.getElementById('player-name').textContent = bestPlayer.Name;

            // Display stats based on player type
            const stats = {
                contact: ['BA', 'OBP', 'SLG'],
                power: ['SLG', 'BA', 'OBP'],
                'best-hitter': ['BA', 'OPS', 'ISO'],
                speedster: ['SB', 'CS', 'RS%'],
                'shutdown-starter': ['FIP', 'SO9', 'QS%'],
                'strikeout-starter': ['SO9', 'BB9'],
                'shutdown-reliever': ['SO9', 'FIP', 'IS%'],
                closer: ['SV', 'BSV%', 'SV%']
            };

            stats[playerType].forEach((stat, index) => {
                document.getElementById(`stat${index + 1}`).textContent = `${stat}: ${bestPlayer[stat]}`;
            });
        })
        .catch(error => console.error('Error fetching player data:', error));

    document.getElementById('select-another').addEventListener('click', () => {
        window.location.href = 'player-selection.html';
    });

    document.getElementById('next-best').addEventListener('click', () => {
        // Logic to display the next best player
    });
});
