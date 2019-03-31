const isTrue = require('./utils/isTrue');
const { ONE_MONTH, ONE_DAY, ONE_WEEK } = require('./constants');

const KEY_MAX_AGE_SECS = parseInt(process.env.KEY_MAX_AGE_SECS, 10) || 6 * ONE_MONTH;

module.exports = {
    AWS_SES_REGION: process.env.AWS_SES_REGION || 'us-east-1',
    FROM_EMAIL: process.env.FROM_EMAIL,
    DEFAULT_TO_EMAIL: process.env.DEFAULT_TO_EMAIL,
    EMAIL_SIGNOFF: process.env.EMAIL_SIGNOFF || '',
    DRY_RUN: isTrue(process.env.DRY_RUN),
    REMOVE_ALREADY_EXPIRED: isTrue(process.env.REMOVE_ALREADY_EXPIRED),
    USERNAME_REGEX: new RegExp(process.env.USERNAME_REGEX),
    KEY_MAX_AGE_SECS,
    FIRST_WARNING_MAX_AGE_SECS: KEY_MAX_AGE_SECS - 2 * ONE_WEEK,
    SECOND_WARNING_MAX_AGE_SECS: KEY_MAX_AGE_SECS - ONE_WEEK,
    LAST_WARNING_MAX_AGE_SECS: KEY_MAX_AGE_SECS - ONE_DAY,
};
