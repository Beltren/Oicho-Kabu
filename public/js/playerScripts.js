document.addEventListener('DOMContentLoaded', () => {
    const playersModal = document.getElementById('players-modal');
    const closePlayersModal = document.getElementById('close-players-modal');
    const addPlayerBtn = document.getElementById('add-player-btn');
    const addPlayerModal = document.getElementById('add-player-modal');
    const closeAddPlayerModal = document.getElementById('close-add-player-modal');
    const submitPlayerBtn = document.getElementById('submit-player-btn');
    const playerNameInput = document.getElementById('player-name-input');
    const playersTable = document.getElementById('players-table').getElementsByTagName('tbody')[0];
    const masterPlayerSelect = document.getElementById('master-player-select');

    const fetchPlayers = async () => {
        const response = await fetch('/players');
        const players = await response.json();
        playersTable.innerHTML = '';
        masterPlayerSelect.innerHTML = '';
        players.forEach(player => {
            const row = playersTable.insertRow();
            const nameCell = row.insertCell(0);
            const pointsCell = row.insertCell(1);
            nameCell.textContent = player.name;
            pointsCell.textContent = player.points;

            const option = document.createElement('option');
            option.value = player.name;
            option.textContent = player.name;
            masterPlayerSelect.appendChild(option);
        });

        try {
            const masterResponse = await fetch('/players/master');
            if (masterResponse.status === 404) {
                console.log('No master player set');
            } else {
                const master = await masterResponse.json();
                if (master) {
                    masterPlayerSelect.value = master.name;
                }
            }
        } catch (error) {
            console.error('Error fetching master player:', error);
        }
    };

    const setMasterPlayer = async (name) => {
        await fetch('/players/master', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
    };

    masterPlayerSelect.addEventListener('change', async () => {
        const selectedPlayer = masterPlayerSelect.value;
        await setMasterPlayer(selectedPlayer);
    });

    addPlayerBtn.addEventListener('click', () => {
        addPlayerModal.style.display = 'block';
    });

    closeAddPlayerModal.onclick = () => {
        addPlayerModal.style.display = 'none';
    };

    submitPlayerBtn.addEventListener('click', async () => {
        const playerName = playerNameInput.value;
        if (playerName) {
            await fetch('/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: playerName })
            });
            playerNameInput.value = '';
            addPlayerModal.style.display = 'none';
            await fetchPlayers();
        }
    });

    closePlayersModal.onclick = () => {
        playersModal.style.display = 'none';
    };

    document.getElementById('players-button').onclick = async () => {
        await fetchPlayers();
        playersModal.style.display = 'block';
    };
});
