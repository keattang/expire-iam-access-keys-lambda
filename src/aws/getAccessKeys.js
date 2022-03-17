const { iam } = require('./services');

const getAccessKeys = async (user) => {
    const resp = await iam.listAccessKeys({ UserName: user.UserName }).promise();
    return resp.AccessKeyMetadata;
};

module.exports = getAccessKeys;
