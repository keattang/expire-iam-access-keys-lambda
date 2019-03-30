const sendNotification = require('./sendNotification');

// prettier-ignore
const warningText = (user, key, period) => `
Hi,
<br><br>
The access key for the AWS IAM user <b>${user.UserName}</b> (${key.AccessKeyId}) <b>will expire</b> and be revoked <b>in ${period}</b>.
<br><br>
If you continue to need programmatic access to AWS for this user you will need to generate a new access key:
<br><br>
https://console.aws.amazon.com/iam/home?#/users/${user.UserName}?section=security_credentials
<br><br>
If you no longer need this user, please delete it.
`;

const warnUser = (user, key, timeframe) =>
    sendNotification(
        user,
        'Your AWS IAM access key is about to expire',
        warningText(user, key, timeframe)
    );

module.exports = warnUser;
