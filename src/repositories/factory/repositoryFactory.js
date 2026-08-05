const { provider } = require("../../configs/repository");

switch (provider.toLowerCase()) {

    case "memory":
        module.exports = require("../in-memory/userRepository");
        break;

    case "dynamodb":
        module.exports = require("../dynamodb/userRepository");
        break;

    default:
        throw new Error(`Unknown repository provider: ${provider}`);
}