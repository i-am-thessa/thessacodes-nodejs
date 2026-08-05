const { randomUUID } = require("crypto");

const {
    GetCommand,
    ScanCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const dynamoDb = require("../../configs/dynamodb");

const TABLE_NAME = process.env.USER_TABLE;

if (!TABLE_NAME) {
    throw new Error("Environment variable USER_TABLE is not configured.");
}

/**
 * GET /users
 */
exports.getUsers = async () => {
    const response = await dynamoDb.send(
        new ScanCommand({
            TableName: TABLE_NAME
        })
    );

    return response.Items || [];
};

/**
 * GET /users/:id
 */
exports.getUser = async (id) => {
    const response = await dynamoDb.send(
        new GetCommand({
            TableName: TABLE_NAME,
            Key: { id }
        })
    );

    return response.Item || null;
};

/**
 * POST /users
 */
exports.createUser = async (user) => {

    const newUser = {
        id: randomUUID(),
        ...user
    };

    await dynamoDb.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: newUser,

            // Prevent duplicate IDs
            ConditionExpression: "attribute_not_exists(id)"
        })
    );

    return newUser;
};

/**
 * PUT /users/:id
 */
exports.updateUser = async (id, body) => {

    if (!body || Object.keys(body).length === 0) {
        return null;
    }

    const updateExpressions = [];
    const attributeNames = {};
    const attributeValues = {};

    for (const [key, value] of Object.entries(body)) {

        updateExpressions.push(`#${key} = :${key}`);

        attributeNames[`#${key}`] = key;

        attributeValues[`:${key}`] = value;
    }

    const response = await dynamoDb.send(
        new UpdateCommand({

            TableName: TABLE_NAME,

            Key: {
                id
            },

            UpdateExpression: `SET ${updateExpressions.join(", ")}`,

            ExpressionAttributeNames: attributeNames,

            ExpressionAttributeValues: attributeValues,

            ConditionExpression: "attribute_exists(id)",

            ReturnValues: "ALL_NEW"

        })
    );

    return response.Attributes || null;
};

/**
 * DELETE /users/:id
 */
exports.deleteUser = async (id) => {

    const response = await dynamoDb.send(
        new DeleteCommand({

            TableName: TABLE_NAME,

            Key: {
                id
            },

            ConditionExpression: "attribute_exists(id)",

            ReturnValues: "ALL_OLD"

        })
    );

    return response.Attributes != null;
};