const service = require("../services/userService");


exports.getUsers = async () => {
    return await service.getUsers();
};

exports.getUser = async (id) => {
    return await service.getUser(id);
};

exports.createUser = async (user) => {
    return await service.createUser(user);
};

exports.updateUser = async (id, user) => {
    return await service.updateUser(id, user);
};

exports.deleteUser = async (id) => {
    return await service.deleteUser(id);
};