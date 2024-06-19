const rules = require('./rulesData');
const eventEmitter = require('../eventEmitter'); // Import the event emitter


let players = [];

const addPlayer = (name) => {
    const startPoints = rules.getStartPoints();
    players.push({ name, points: startPoints, isMaster: false });
};

const deletePlayer = (name) => {
    players = players.filter(player => player.name !== name);
};

const getPlayer = (name) => {
    return players.find(player => player.name === name);
};

const getAllPlayers = () => {
    return players;
};

const makeMaster = (name) => {
    players.forEach(player => {
        player.isMaster = (player.name === name);
    });
};

const getMaster = () => {
    return players.find(player => player.isMaster) || null;
};

const updatePlayerPoints = (name, points) => {
    const player = getPlayer(name);
    if (player) {
        player.points = points;
        eventEmitter.emit('updatePlayerPoints'); // Emit the update event
    }
};

module.exports = {
    addPlayer,
    deletePlayer,
    getPlayer,
    getAllPlayers,
    makeMaster,
    getMaster,
    updatePlayerPoints
};
