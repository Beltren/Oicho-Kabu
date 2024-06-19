const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/v4', (req, res) => {
    const ifaces = os.networkInterfaces();
    let ipAddress = '';

    console.log('Network Interfaces:', ifaces);

    if (ifaces.en0) {
        ifaces.en0.forEach(details => {
            if (details.family === 'IPv4' && !details.internal) {
                ipAddress = details.address;
                console.log(`Selected IP address from en0: ${ipAddress}`);
            }
        });
    } else {
        console.log('No en0 interface found.');
    }

    if (ipAddress) {
        console.log(`Returning IP address: ${ipAddress}`);
    } else {
        console.log('No external IPv4 address found.');
    }

    res.json({ ip: ipAddress, port: process.env.PORT || 3001 });
});

module.exports = router;
