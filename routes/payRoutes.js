const express = require('express');
const router = express.Router();
const players = require('../data/playersData'); // Use players data object
const bets = require('../data/betsData'); // Use bets data object

router.post('/', (req, res) => {
    const { cardId, player, points, multiplier } = req.body;

    if (!cardId) {
        return res.status(400).send('Card ID is required');
    }

    const masterPlayer = players.getMaster();
    if (!masterPlayer) {
        return res.status(404).send('No master player set');
    }

    if (player && points && multiplier) {
        // Handle multiplier payment
        const bet = bets.getBetsForCard(cardId).find(bet => bet.player === player);
        if (bet) {
            const totalPoints = bet.points * multiplier;
            players.updatePlayerPoints(player, players.getPlayer(player).points + totalPoints);
            players.updatePlayerPoints(masterPlayer.name, masterPlayer.points - totalPoints);
            bets.clearBetsForCard(cardId);
            res.status(200).send('Points transferred and bets cleared');
        } else {
            res.status(404).send('Bet not found');
        }
    } else {
        // Handle lose payment
        const cardBets = bets.getBetsForCard(cardId);
        let totalPoints = 0;

        cardBets.forEach(bet => {
            totalPoints += bet.points;
        });

        players.updatePlayerPoints(masterPlayer.name, masterPlayer.points + totalPoints);
        bets.clearBetsForCard(cardId);

        res.status(200).send('Points transferred and bets cleared');
    }
});

module.exports = router;
