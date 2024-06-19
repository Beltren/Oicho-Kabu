document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    socket.on('updatePlayerPoints', async () => {
        // Fetch updated player points
        const response = await fetch('/players');
        const players = await response.json();
        updatePlayerPoints(players);
    });

    document.querySelectorAll('.player-button').forEach(button => {
        button.addEventListener('click', () => {
            const playerName = button.getAttribute('data-player');
            const playerPoints = button.getAttribute('data-points');
            document.getElementById('player-list').style.display = 'none';
            document.getElementById('player-points').innerText = `${playerName}: ${playerPoints} Points`;
            document.getElementById('player-details').style.display = 'block';
        });
    });

    const updatePlayerPoints = (players) => {
        players.forEach(player => {
            const playerButton = document.querySelector(`.player-button[data-player="${player.name}"]`);
            if (playerButton) {
                playerButton.setAttribute('data-points', player.points);
                const playerPointsElement = document.getElementById('player-points');
                if (playerPointsElement && playerPointsElement.innerText.startsWith(player.name)) {
                    playerPointsElement.innerText = `${player.name}: ${player.points} Points`;
                }
            }
        });
    };
});
