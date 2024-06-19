const express = require('express');
const router = express.Router();
const players = require('../data/playersData'); // Ensure this points to your players data file

router.get('/', (req, res) => {
    res.render('playersPage', { players: players.getAllPlayers() });
});

module.exports = router;
