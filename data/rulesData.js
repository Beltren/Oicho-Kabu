let maxBetSize = 100; // Default max bet size
let startPoints = 50; // Default start points

const setRules = (betSize, newStartPoints) => {
    if (typeof betSize === 'number' && betSize > 0 && typeof newStartPoints === 'number' && newStartPoints > 0) {
        maxBetSize = betSize;
        startPoints = newStartPoints;
    }
};

const getMaxBetSize = () => {
    return maxBetSize;
};

const getStartPoints = () => {
    return startPoints;
};

module.exports = {
    setRules,
    getMaxBetSize,
    getStartPoints
};
