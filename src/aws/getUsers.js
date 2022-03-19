const { paginateListUsers } = require('@aws-sdk/client-iam');
const { iam } = require('./services');

const getUsers = async () => {
    const paginator = paginateListUsers(
        {
            client: iam,
            pageSize: 100,
        },
        {}
    );

    const users = [];
    for await (const page of paginator) {
        users.push(...page.Users);
    }

    return users;
};

module.exports = getUsers;
