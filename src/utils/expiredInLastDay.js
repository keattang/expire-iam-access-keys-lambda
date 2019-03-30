const ageSecs = require('./ageSecs');
const expired = require('./expired');
const { ONE_DAY } = require('../constants');

const expiredInLastDay = (dateString, maxAgeSecs) => {
    const age = ageSecs(dateString);
    const timeSinceExpiry = age - maxAgeSecs;
    const isExpired = expired(dateString, maxAgeSecs);
    return isExpired && timeSinceExpiry <= ONE_DAY;
};

module.exports = expiredInLastDay;
