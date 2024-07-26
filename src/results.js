document.addEventListener('DOMContentLoaded', () => {
    const playerType = new URLSearchParams(window.location.search).get('playerType');
    const teamAbbreviation = new URLSearchParams(window.location.search).get('team');
    const winningPercentage = parseFloat(localStorage.getItem('teamWinningPercentage'));

    function divideArrayIntoThree(array) {
        const length = array.length;
        const partSize = Math.ceil(length / 3);

        const firstPart = array.slice(0, partSize);
        const secondPart = array.slice(partSize, partSize * 2);
        const thirdPart = array.slice(partSize * 2);

        return [firstPart, secondPart, thirdPart];
    }

    function splitName(fullName) {
        const names = fullName.split(' ');
        return {
            firstName: names[0],
            lastName: names[names.length - 1]
        };
    }

    function displayPlayer(player) {
        const playerContainer = document.getElementById('player-container');
        const statsContainer = document.getElementById('stats-container');
        const playerName = document.getElementById('player-name');
        const baseballRefLink = document.getElementById('baseball-ref-link');
        
        const { lastName } = splitName(player.Name);

        playerName.textContent = player.Name;
        baseballRefLink.href = `https://www.baseball-reference.com/players/${lastName[0].toLowerCase()}/${player.Username}.shtml`;

        statsContainer.innerHTML = '';

        switch (playerType) {
            case 'Contact':
            case 'Power':
            case 'Best Hitter':
                statsContainer.innerHTML = `
                    <p>BA: ${player.BA}</p>
                    <p>OBP: ${player.OBP}</p>
                    <p>SLG: ${player.SLG}</p>
                `;
                break;
            case 'Speedster':
                statsContainer.innerHTML = `
                    <p>SB: ${player.SB}</p>
                    <p>CS: ${player.CS}</p>
                    <p>RS%: ${player.RS}</p>
                `;
                break;
            case 'Shutdown Starter':
            case 'Strikeout Starter':
                statsContainer.innerHTML = `
                    <p>FIP: ${player.FIP}</p>
                    <p>SO9: ${player.SO9}</p>
                `;
                break;
            case 'Best Reliever':
                statsContainer.innerHTML = `
                    <p>SO9: ${player.SO9}</p>
                    <p>FIP: ${player.FIP}</p>
                    <p>IS%: ${player.IS}</p>
                `;
                break;
            case 'Best Closer':
                statsContainer.innerHTML = `
                    <p>SV: ${player.SV}</p>
                    <p>BSV%: ${player.BSV}</p>
                    <p>SV%: ${player.SV_PCT}</p>
                `;
                break;
        }
    }

    function fetchPlayers() {
        fetch(`/players?playerType=${encodeURIComponent(playerType)}&team=${encodeURIComponent(teamAbbreviation)}`)
            .then(response => response.json())
            .then(players => {
                let sortedPlayers = [];
                switch (playerType) {
                    case 'Contact':
                        sortedPlayers = players.sort((a, b) => b.BA - a.BA);
                        break;
                    case 'Power':
                        sortedPlayers = players.sort((a, b) => b.SLG - a.SLG);
                        break;
                    case 'Best Hitter':
                        sortedPlayers = players.sort((a, b) => (b.OPS + b.ISO + b.rOBA) - (a.OPS + a.ISO + a.rOBA));
                        break;
                    case 'Speedster':
                        sortedPlayers = players.sort((a, b) => (b.OBP + b.SB + b.CS + b.RS) - (a.OBP + a.SB + a.CS + a.RS));
                        break;
                    case 'Shutdown Starter':
                        sortedPlayers = players.sort((a, b) => (b.SO9 + b.FIP + b.QS - b.BB9 - b.HR9) - (a.SO9 + a.FIP + a.QS - a.BB9 - a.HR9));
                        break;
                    case 'Strikeout Starter':
                        sortedPlayers = players.sort((a, b) => b.SO9 - a.SO9 - (b.BB9 - a.BB9));
                        break;
                    case 'Best Reliever':
                        sortedPlayers = players.sort((a, b) => (b.SO9 + b.FIP - b.IS) - (a.SO9 + a.FIP - a.IS));
                        break;
                    case 'Best Closer':
                        sortedPlayers = players.sort((a, b) => (b.SV + b.BSV + b.SV_PCT - b.BSV - b.HR9) - (a.SV + a.BSV + a.SV_PCT - a.BSV - a.HR9));
                        break;
                }

                const [topTier, middleTier, bottomTier] = divideArrayIntoThree(sortedPlayers);

                let playersToShow = [];
                if (winningPercentage >= 0.535) {
                    playersToShow = topTier;
                } else if (winningPercentage < 0.535 && winningPercentage >= 0.485) {
                    playersToShow = middleTier;
                } else {
                    playersToShow = bottomTier;
                }

                if (playersToShow.length > 0) {
                    displayPlayer(playersToShow[0]);
                    playersToShow.shift();
                } else {
                    document.getElementById('player-container').innerHTML = `
                        <p>No more players available. Go back to the <a href="/player-selection.html">player selection</a> screen.</p>
                    `;
                }

                const nextBtn = document.getElementById('next-btn');
                const selectAnotherBtn = document.getElementById('select-another-btn');

                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        if (playersToShow.length > 0) {
                            displayPlayer(playersToShow[0]);
                            playersToShow.shift();
                        } else {
                            document.getElementById('player-container').innerHTML = `
                                <p>No more players available. Go back to the <a href="/player-selection.html">player selection</a> screen.</p>
                            `;
                        }
                    });
                }

                if (selectAnotherBtn) {
                    selectAnotherBtn.addEventListener('click', () => {
                        window.location.href = `/player-selection.html?team=${teamAbbreviation}`;
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching players:', error);
                document.getElementById('player-container').innerHTML = `
                    <p>There was an error fetching players. Please try again later.</p>
                `;
            });
    }

    fetchPlayers();
});
