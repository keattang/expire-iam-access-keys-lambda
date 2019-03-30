const getUsers = require('./getUsers');
const getAccessKeys = require('./getAccessKeys');

const getUsersAndKeys = async () => {
    const users = await getUsers();
    const keys = await Promise.all(users.map(getAccessKeys));
    return users.map((user, idx) => [user, keys[idx]]);
};

module.exports = getUsersAndKeys;
