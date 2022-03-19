const { DeleteAccessKeyCommand } = require('@aws-sdk/client-iam');
const { iam } = require('./services');
const { DRY_RUN } = require('../config');

const deleteAccessKey = async (user, key) => {
    if (DRY_RUN) return;

    const resp = await iam.send(
        new DeleteAccessKeyCommand({
            UserName: user.UserName,
            AccessKeyId: key.AccessKeyId,
        })
    );

    return resp;
};

module.exports = deleteAccessKey;
