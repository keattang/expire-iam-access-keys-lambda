const { ListAccessKeysCommand } = require('@aws-sdk/client-iam');
const { iam } = require('./services');

const getAccessKeys = async (user) => {
    const resp = await iam.send(
        new ListAccessKeysCommand({
            UserName: user.UserName,
        })
    );
    return resp.AccessKeyMetadata;
};

module.exports = getAccessKeys;
