const { FROM_EMAIL, DEFAULT_TO_EMAIL } = require('../config');
const { IS_EMAIL } = require('../constants');
const sendEmail = require('../aws/sendEmail');

const notifyUser = (user, title, message) => {
    const toEmail = IS_EMAIL.test(user.UserName) ? user.UserName : DEFAULT_TO_EMAIL;
    return sendEmail(toEmail, FROM_EMAIL, title, message);
};

module.exports = notifyUser;
