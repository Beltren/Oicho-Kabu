const express = require('express');
const router = express.Router();
const players = require('../data/playersData'); // Use players data object

// Get players
router.get('/', (req, res) => {
    res.json(players.getAllPlayers());
});

// Add player
router.post('/', (req, res) => {
    const { name } = req.body;
    if (name) {
        players.addPlayer(name);
        res.status(201).send('Player added');
    } else {
        res.status(400).send('Name is required');
    }
});

// Set master player
router.post('/master', (req, res) => {
    const { name } = req.body;
    if (name) {
        players.makeMaster(name);
        res.status(201).send('Master player set');
    } else {
        res.status(400).send('Name is required');
    }
});

// Get current master player
router.get('/master', (req, res) => {
    const masterPlayer = players.getMaster();
    if (masterPlayer) {
        res.json(masterPlayer);
    } else {
        res.status(404).send('No master player set');
    }
});

// Get points of current master player
router.get('/master/points', (req, res) => {
    const masterPlayer = players.getMaster();
    if (masterPlayer) {
        res.json({ points: masterPlayer.points });
    } else {
        res.status(404).send('No master player set');
    }
});

// Example route that updates player points
router.post('/update-points', (req, res) => {
    const { player, points } = req.body;
    const playerData = playersData.find(p => p.name === player);
    if (playerData) {
        playerData.points = points;
        emitPlayerUpdate(); // Emit the update event
        res.status(200).json({ message: 'Player points updated' });
    } else {
        res.status(404).json({ message: 'Player not found' });
    }
});

module.exports = router;
