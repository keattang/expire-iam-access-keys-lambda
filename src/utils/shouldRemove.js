const expiredInLastDay = require('./expiredInLastDay');
const { REMOVE_ALREADY_EXPIRED } = require('../config');

const shouldRemove = (dateString, maxAgeSecs) =>
    expiredInLastDay(dateString, maxAgeSecs) || REMOVE_ALREADY_EXPIRED;

module.exports = shouldRemove;
