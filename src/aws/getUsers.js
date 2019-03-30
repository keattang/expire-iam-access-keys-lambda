const { iam } = require('./services');

const getUsers = async () => {
    const resp = await iam.listUsers().promise();
    return resp.Users;
};

module.exports = getUsers;
