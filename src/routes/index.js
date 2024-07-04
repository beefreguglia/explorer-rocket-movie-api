const { Router } = require("express");

const userRouter = require("./users.routes");
const movieNotesRouter = require("./movie_notes.routes");

const routes = Router();

routes.use('/users/', userRouter);
routes.use('/movie_notes/', movieNotesRouter);

module.exports = routes;