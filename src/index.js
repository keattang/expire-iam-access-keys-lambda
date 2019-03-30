const deleteAccessKey = require('./aws/deleteAccessKey');
const getUsersAndKeys = require('./aws/getUsersAndKeys');
const expired = require('./utils/expired');
const shouldRemove = require('./utils/shouldRemove');
const daysTilExpiry = require('./utils/daysTilExpiry');
const expiredInLastDay = require('./utils/expiredInLastDay');
const notifyUser = require('./notifications/notifyUser');
const warnUser = require('./notifications/warnUser');
const {
    DRY_RUN,
    USERNAME_REGEX,
    KEY_MAX_AGE_SECS,
    LAST_WARNING_MAX_AGE_SECS,
    SECOND_WARNING_MAX_AGE_SECS,
    FIRST_WARNING_MAX_AGE_SECS,
} = require('./config');

const processUser = ([user, accessKeys]) => {
    console.log(`\nChecking user ${user.UserName}`);

    if (!accessKeys.length) {
        console.log('No access keys found');
        return;
    }

    return Promise.all(
        accessKeys.map(key => {
            if (expired(key.CreateDate, KEY_MAX_AGE_SECS)) {
                if (shouldRemove(key.CreateDate, KEY_MAX_AGE_SECS)) {
                    console.log(`Removing expired access key ${key.AccessKeyId}`);

                    return Promise.all([
                        deleteAccessKey(user, key),
                        notifyUser(user, key),
                    ]);
                }

                console.log(
                    `The access key ${key.AccessKeyId} is expired but was not removed`
                );
                return;
            }

            console.log(
                `Access key ${key.AccessKeyId} will expire in ` +
                    `${daysTilExpiry(key.CreateDate, KEY_MAX_AGE_SECS)} days`
            );

            if (expiredInLastDay(key.CreateDate, LAST_WARNING_MAX_AGE_SECS)) {
                console.log(`Sending last warning`);
                return warnUser(user, key, '24 hours');
            }

            if (expiredInLastDay(key.CreateDate, SECOND_WARNING_MAX_AGE_SECS)) {
                console.log(`Sending second warning`);
                return warnUser(user, key, '1 week');
            }

            if (expiredInLastDay(key.CreateDate, FIRST_WARNING_MAX_AGE_SECS)) {
                console.log(`Sending first warning`);
                return warnUser(user, key, '2 weeks');
            }

            console.log('No action taken.');
            return undefined;
        })
    );
};

exports.handler = async () => {
    console.log('=== Starting IAM user access key scan ===');

    if (DRY_RUN)
        console.log(
            '*** Dry run enabled. No notifications will be sent or access keys deleted ***\n'
        );

    const usersAndKeys = await getUsersAndKeys();

    console.log(`Found ${usersAndKeys.length} users.`);

    // Filter out any usernames not matched by the filter
    const filteredUsersAndKeys = usersAndKeys.filter(([user]) =>
        USERNAME_REGEX.test(user.UserName)
    );

    console.log(
        `Found ${filteredUsersAndKeys.length} users after filtering by RegEx: `,
        USERNAME_REGEX
    );

    await Promise.all(filteredUsersAndKeys.map(processUser));

    console.log('=== Done ===');
};
