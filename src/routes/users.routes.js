const { Router } = require("express");
const UserController = require("../controllers/UserController");

const userRoutes = Router();
const usersController = new UserController();

userRoutes.post("/", usersController.create);
userRoutes.put("/:user_id", usersController.update);

module.exports = userRoutes;