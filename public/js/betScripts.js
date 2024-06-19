document.addEventListener('DOMContentLoaded', () => {
    const betModal = document.getElementById('bet-modal');
    const closeBetModal = document.getElementById('close-bet-modal');
    const playerSelect = document.getElementById('player-select');
    const betPointsSlider = document.getElementById('bet-points-slider');
    const betPointsValue = document.getElementById('bet-points-value');
    const submitBetBtn = document.getElementById('submit-bet-btn');
    const bankPoints = document.getElementById('bank-points');
    const winMultiplierModal = document.getElementById('win-multiplier-modal');
    const closeWinMultiplierModal = document.getElementById('close-win-multiplier-modal');

    let currentCardId = null;
    let currentBet = null;

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
                option.dataset.points = player.points;
                option.textContent = player.name;
                playerSelect.appendChild(option);
            }
        });
    };

    const fetchAvailableBet = async (cardId) => {
        try {
            const response = await fetch('/availableBet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cardId })
            });
            const data = await response.json();
            return data.availableBet;
        } catch (error) {
            console.error('Error fetching available bet:', error);
            return 0;
        }
    };

    const fetchBankPoints = async () => {
        try {
            const response = await fetch('/players/master/points');
            if (response.ok) {
                const data = await response.json();
                bankPoints.textContent = data.points;
            } else {
                bankPoints.textContent = '0';
                console.error('Failed to fetch bank points:', response.status);
            }
        } catch (error) {
            console.error('Error fetching bank points:', error);
            bankPoints.textContent = '0';
        }
    };

    const updateSliderMax = async (cardId) => {
        const selectedOption = playerSelect.options[playerSelect.selectedIndex];
        const playerPoints = parseInt(selectedOption.dataset.points, 10);
        const availableBet = await fetchAvailableBet(cardId);
        const maxAvailablePoints = Math.min(playerPoints, availableBet);
        if (maxAvailablePoints > 0) {
            betPointsSlider.style.display = 'block';
            betPointsSlider.max = maxAvailablePoints;
            betPointsSlider.value = 1;
            betPointsValue.textContent = betPointsSlider.value;
        } else {
            betPointsSlider.style.display = 'none';
            betPointsValue.textContent = 'No available points to bet';
        }
    };

    playerSelect.addEventListener('change', () => {
        const cardId = submitBetBtn.dataset.card;
        updateSliderMax(cardId);
    });

    betPointsSlider.addEventListener('input', () => {
        betPointsValue.textContent = betPointsSlider.value;
    });

    document.querySelectorAll('.bet-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            await fetchPlayersForBet();
            const cardId = event.target.dataset.card;
            submitBetBtn.dataset.card = cardId;
            updateSliderMax(cardId);
            betModal.style.display = 'block';
        });
    });

    submitBetBtn.addEventListener('click', async () => {
        const player = playerSelect.value;
        const points = betPointsSlider.value;
        const cardId = submitBetBtn.dataset.card;
        if (player && points) {
            const response = await fetch(`/bets/${cardId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ player, points: parseInt(points, 10) })
            });
            if (response.ok) {
                betModal.style.display = 'none';
                updateCardTable(cardId);
                await fetchPlayersForBet();
                await fetchBankPoints();
            } else {
                alert('Bet could not be placed. Ensure the player has sufficient points.');
            }
        }
    });

    closeBetModal.onclick = () => {
        betModal.style.display = 'none';
    };

    closeWinMultiplierModal.onclick = () => {
        winMultiplierModal.style.display = 'none';
    };

    const updateCardTable = async (cardId) => {
        const response = await fetch(`/bets/${cardId}`);
        const bets = await response.json();
        const cardTable = document.getElementById(`card${cardId}-table`);
        cardTable.innerHTML = `
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const cardTableBody = cardTable.querySelector('tbody');
        bets.forEach(bet => {
            const tr = document.createElement('tr');
            const nameTd = document.createElement('td');
            nameTd.textContent = bet.player;
            const pointsTd = document.createElement('td');
            pointsTd.textContent = bet.points;
            tr.appendChild(nameTd);
            tr.appendChild(pointsTd);
            cardTableBody.appendChild(tr);
        });
    };

    const updateAllCardTables = async () => {
        const cardIds = [1, 2, 3, 4];
        for (const cardId of cardIds) {
            await updateCardTable(cardId);
        }
    };

    updateAllCardTables();

    document.querySelectorAll('.lose-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const cardId = event.target.dataset.card;
            const response = await fetch('/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cardId })
            });
            if (response.ok) {
                updateCardTable(cardId);
                await fetchPlayersForBet();
                await fetchBankPoints();
            } else {
                console.error('Error processing payment.');
            }
        });
    });

    document.querySelectorAll('.win-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            currentCardId = event.target.dataset.card;
            const response = await fetch(`/bets/${currentCardId}`);
            const bets = await response.json();
            if (bets.length > 0) {
                currentBet = bets[0];
                winMultiplierModal.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.multiplier-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const multiplier = event.target.dataset.multiplier;
            if (currentBet && currentCardId) {
                const response = await fetch('/pay', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cardId: currentCardId, player: currentBet.player, points: currentBet.points, multiplier: multiplier })
                });
                if (response.ok) {
                    winMultiplierModal.style.display = 'none';
                    updateCardTable(currentCardId);
                    await fetchPlayersForBet();
                    await fetchBankPoints();
                } else {
                    console.error('Error processing multiplier payment.');
                }
            }
        });
    });

    fetchBankPoints();
});
