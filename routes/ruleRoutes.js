const express = require('express');
const router = express.Router();
const rules = require('../data/rulesData.js'); // Use rules data object

// Get current rules
router.get('/', (req, res) => {
    res.json({ maxBetSize: rules.getMaxBetSize(), startPoints: rules.getStartPoints() });
});

// Set game rules
router.post('/', (req, res) => {
    const { betSize, startPoints: newStartPoints } = req.body;
    rules.setRules(betSize, newStartPoints);
    res.status(201).send('Game rules set');
});

module.exports = router;
