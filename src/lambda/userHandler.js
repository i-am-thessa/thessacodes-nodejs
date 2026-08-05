const controller = require('../controllers/userController');
const response = require('../utils/response');

exports.handler = async (event) => {
    try {
        const method = event.requestContext.http.method;
        const id = event.pathParameters?.id;
        const body = event.body ? JSON.parse(event.body) : null;

        switch (method) {
            case 'GET':
                if (id) {
                    const user = await controller.getUser(id);

                    if (!user) {
                        return response.error(404, 'User not found');
                    }

                    return response.success(200, user);
                }

                const users = await controller.getUsers();

                return response.success(200, users);

            case 'POST':
                const createdUser = await controller.createUser(body);

                return response.success(201, createdUser);

            case 'PUT':
                const updatedUser = await controller.updateUser(id, body);

                if (!updatedUser) {
                    return response.error(404, 'User not found');
                }

                return response.success(200, updatedUser);

            case 'DELETE':
                const deleted = await controller.deleteUser(id);

                if (!deleted) {
                    return response.error(404, 'User not found');
                }

                return response.success(204, null);

            default:
                return response.error(405, 'Method Not Allowed');
        }
    } catch (err) {
        console.error(err);

        return response.error(500, err.message);
    }
};
