document.addEventListener('DOMContentLoaded', () => {
    const rulesModal = document.getElementById('rules-modal');
    const closeRulesModal = document.getElementById('close-rules-modal');
    const rulesButton = document.getElementById('rules-button');
    const submitRulesBtn = document.getElementById('submit-rules-btn');
    const maxBetInput = document.getElementById('max-bet-input');
    const startPointsInput = document.getElementById('start-points-input');

    rulesButton.addEventListener('click', async () => {
        // Fetch current rules from the server
        const response = await fetch('/rules');
        if (response.ok) {
            const rules = await response.json();
            maxBetInput.value = rules.maxBetSize;
            startPointsInput.value = rules.startPoints;
        }
        rulesModal.style.display = 'block';
    });

    closeRulesModal.onclick = () => {
        rulesModal.style.display = 'none';
    };

    submitRulesBtn.addEventListener('click', async () => {
        const maxBet = parseInt(maxBetInput.value, 10);
        const startPoints = parseInt(startPointsInput.value, 10);
        await fetch('/rules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ maxBet, startPoints })
        });
        rulesModal.style.display = 'none';
    });
});
