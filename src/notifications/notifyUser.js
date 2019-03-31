const sendNotification = require('./sendNotification');
const { EMAIL_SIGNOFF } = require('../config');

// prettier-ignore
const expiredText = (user, key) => `
Hi,
<br><br>
The access key for the AWS IAM user <b>${user.UserName}</b> (${key.AccessKeyId}) <b>has expired</b> and has been revoked.
<br><br>
If you continue to need programmatic access to AWS for this user you will need to generate a new access key:
<br><br>
https://console.aws.amazon.com/iam/home?#/users/${user.UserName}?section=security_credentials
<br><br>
If you no longer need this user, please delete it.

${EMAIL_SIGNOFF}
`;

const notifyUser = (user, key) =>
    sendNotification(user, 'Your AWS IAM access key has expired', expiredText(user, key));

module.exports = notifyUser;
