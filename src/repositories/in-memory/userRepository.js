const { randomUUID } = require("crypto");

let users = [];

console.log("Memory Repository initialized");

exports.getUsers = async () => {
    return users;
};

exports.getUser = async (id) => {
    return users.find((user) => user.id === id);
};

exports.createUser = async (user) => {
    const newUser = {
        id: randomUUID(),
        ...user
    };

    users.push(newUser);

    return newUser;
};

exports.updateUser = async (id, body) => {
    const user = users.find((user) => user.id === id);

    if (!user) {
        return null;
    }

    Object.assign(user, body);

    return user;
};

exports.deleteUser = async (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return false;
    }

    users.splice(index, 1);

    return true;
};