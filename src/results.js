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
        // const playerContainer = document.getElementById('player-container');
        const statsContainer = document.getElementById('stats-container');
        const playerName = document.getElementById('player-name');
        const baseballRefLink = document.getElementById('baseball-ref-link');
        
        const { lastName } = splitName(player.Name);

        playerName.textContent = player.Name;
        console.log('Player Username:', player.Username);
        console.log('Last Name:', lastName);
        console.log('Player data:', player);


        baseballRefLink.href = `https://www.baseball-reference.com/players/${lastName[0].toLowerCase()}/${player.Username}.shtml`;

        statsContainer.innerHTML = '';

        switch (playerType) {
            case 'Contact':
            case 'Power':
                console.log('Player data:', player);
                console.log('BA:', player.Stat1);
                console.log('OBP:', player.Stat2);
                console.log('SLG:', player.Stat3);

                statsContainer.innerHTML = `
                    <p>BA: ${player.Stat1}</p>
                    <p>OBP: ${player.Stat2}</p>
                    <p>SLG: ${player.Stat3}</p>
                `;
                break;
            case 'Best Hitter':
                statsContainer.innerHTML = `
                    <p>BA: ${player.Stat2}</p>
                    <p>OBP: ${player.Stat3}</p>
                    <p>SLG: ${player.Stat4}</p>
                `;
                break;
            case 'Speedster':
                statsContainer.innerHTML = `
                    <p>SB: ${player.Stat2}</p>
                    <p>CS: ${player.Stat3}</p>
                    <p>RS%: ${player.Stat4}</p>
                `;
                break;
            case 'Shutdown Starter':
            case 'Strikeout Starter':
                statsContainer.innerHTML = `
                    <p>S09: ${player.Stat2}</p>
                    <p>FIP: ${player.Stat3}</p>
                `;
                break;
            case 'Best Reliever':
                statsContainer.innerHTML = `
                    <p>SV: ${player.Stat2}</p>
                    <p>BSV%: ${player.Stat3* 10}%</p>
                    <p>SV%: ${player.Stat4* 100}%</p>
                `;
                break;
            case 'Best Closer':
                statsContainer.innerHTML = `
                    <p>SV: ${player.Stat2}</p>
                    <p>BSV%: ${player.Stat3* 10}%</p>
                    <p>SV%: ${player.Stat4* 100}%</p>
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
                        <p>No more players available. Go back to the <a href="/player-selection.html?team=${encodeURIComponent(teamAbbreviation)}">player selection</a> screen.</p>
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
