const express = require('express');
const router = express.Router();
const rules = require('../data/rulesData.js'); // Use rules data object
const bets = require('../data/betsData.js'); // Use bets data object

// Get available bet
router.post('/', (req, res) => {
    const { cardId } = req.body;
    console.log('Received request for available bet for card:', cardId);
    if (!cardId) {
        return res.status(400).send('Card ID is required');
    }
    try {
        const maxBetSize = rules.getMaxBetSize();
        console.log(`Max Bet Size from rules: ${maxBetSize}`);
        const totalBets = bets.getTotalBets();
        console.log(`Total Bets Calculated: ${totalBets}`);
        const availableBet = maxBetSize - totalBets;
        console.log(`Calculated Available Bet: ${availableBet}`);
        res.json({ availableBet });
    } catch (error) {
        console.error('Error processing request for available bet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
