document.addEventListener('DOMContentLoaded', () => {
    const playersModal = document.getElementById('players-modal');
    const addPlayerModal = document.getElementById('add-player-modal');
    const rulesModal = document.getElementById('rules-modal');
    const betModal = document.getElementById('bet-modal');

    const closePlayersModal = document.getElementById('close-players-modal');
    const closeAddPlayerModal = document.getElementById('close-add-player-modal');
    const closeRulesModal = document.getElementById('close-rules-modal');
    const closeBetModal = document.getElementById('close-bet-modal');

    closePlayersModal.onclick = () => {
        playersModal.style.display = 'none';
    };

    closeAddPlayerModal.onclick = () => {
        addPlayerModal.style.display = 'none';
    };

    closeRulesModal.onclick = () => {
        rulesModal.style.display = 'none';
    };

    closeBetModal.onclick = () => {
        betModal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === playersModal) {
            playersModal.style.display = 'none';
        }
        if (event.target === addPlayerModal) {
            addPlayerModal.style.display = 'none';
        }
        if (event.target === rulesModal) {
            rulesModal.style.display = 'none';
        }
        if (event.target === betModal) {
            betModal.style.display = 'none';
        }
    };
});
