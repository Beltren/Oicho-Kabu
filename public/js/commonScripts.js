const fetchPlayersForBet = async () => {
    const response = await fetch('/players');
    const players = await response.json();
    playerSelect.innerHTML = '';

    const masterResponse = await fetch('/players/master');
    const master = masterResponse.status === 200 ? await masterResponse.json() : null;

    players.forEach(player => {
        if (!master || player.name !== master.name) {
            const option = document.createElement('option');
            option.value = player.name;
            option.dataset.points = player.points; // Store available points in a data attribute
            option.textContent = player.name;
            playerSelect.appendChild(option);
        }
    });
};
