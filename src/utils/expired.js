const ageSecs = require('./ageSecs');

const expired = (dateString, maxAgeSecs) => {
    const age = ageSecs(dateString);
    return age >= maxAgeSecs;
};

module.exports = expired;
