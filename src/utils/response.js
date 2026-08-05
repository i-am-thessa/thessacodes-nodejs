exports.success = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : ""
    };
};

exports.error = (statusCode, message) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message
        })
    };
};