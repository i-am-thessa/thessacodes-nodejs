// Wraps the Express application for AWS Lambda

const serverless = require("serverless-http");
const app = require("../express/app");

module.exports.handler = serverless(app);