let bets = {
    1: [],
    2: [],
    3: [],
    4: []
};

const addBet = (cardId, player, points) => {
    if (bets[cardId]) {
        bets[cardId].push({ player, points });
    }
};

const getBetsForCard = (cardId) => {
    return bets[cardId] || [];
};

const getTotalBets = () => {
    return Object.values(bets).flat().reduce((total, bet) => total + bet.points, 0) || 0;
};

const getAllBets = () => {
    return bets;
};

const clearBetsForCard = (cardId) => {
    if (bets[cardId]) {
        bets[cardId] = [];
    }
};

module.exports = {
    addBet,
    getBetsForCard,
    getTotalBets,
    getAllBets,
    clearBetsForCard
};
