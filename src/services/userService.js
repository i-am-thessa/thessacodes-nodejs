const repository = require("../repositories/factory/repositoryFactory");

exports.getUsers = async () => {
    return await repository.getUsers();
};

exports.getUser = async (id) => {
    return await repository.getUser(id);
};

exports.createUser = async (user) => {
    return await repository.createUser(user);
};

exports.updateUser = async (id, user) => {
    return await repository.updateUser(id, user);
};

exports.deleteUser = async (id) => {
    return await repository.deleteUser(id);
};