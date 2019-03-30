const { iam } = require('./services');
const { DRY_RUN } = require('../config');

const deleteAccessKey = async (user, key) => {
    const resp = await iam
        .deleteAccessKey({
            UserName: user.UserName,
            AccessKeyId: key.AccessKeyId,
        })
        .promise();

    if (DRY_RUN) return Promise.resolve();
    return resp;
};

module.exports = deleteAccessKey;
