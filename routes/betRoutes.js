const express = require('express');
const router = express.Router();
const players = require('../data/playersData.js'); // Use players data object
const rules = require('../data/rulesData.js'); // Use rules data object
const bets = require('../data/betsData.js'); // Use bets data object

// Get bets for a card
router.get('/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    res.json(bets.getBetsForCard(cardId));
});

// Place a bet
router.post('/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    const { player, points } = req.body;
    console.log(`Received bet for card ${cardId}:`, req.body); // Log the request body
    if (player && points !== undefined) {
        const playerObj = players.getPlayer(player);
        if (playerObj) {
            const maxBetSize = rules.getMaxBetSize();
            const totalBets = bets.getTotalBets();
            if (totalBets + points <= maxBetSize && playerObj.points >= points) {
                // Update player points using the provided function
                players.updatePlayerPoints(player, playerObj.points - points);
                bets.addBet(cardId, player, points);
                res.status(201).send('Bet placed');
            } else {
                res.status(400).send('Bet exceeds maximum allowed or insufficient points');
            }
        } else {
            res.status(400).send('Invalid player');
        }
    } else {
        res.status(400).send('Player and points are required');
    }
});

module.exports = router;
