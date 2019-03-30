const ageSecs = require('./ageSecs');
const { ONE_DAY } = require('../constants');

const daysTilExpiry = (dateString, maxAgeSecs) => {
    const age = ageSecs(dateString);
    const secsTilExpiry = maxAgeSecs - age;
    return Math.ceil(secsTilExpiry / ONE_DAY);
};

module.exports = daysTilExpiry;
