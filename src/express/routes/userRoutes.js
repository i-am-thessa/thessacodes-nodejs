const express = require("express");

const router = express.Router();

const controller = require("../../controllers/userController");

router.get("/", async (req, res, next) => {
    try {
        const users = await controller.getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const user = await controller.getUser(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const user = await controller.createUser(req.body);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const user = await controller.updateUser(
            req.params.id,
            req.body
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await controller.deleteUser(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;