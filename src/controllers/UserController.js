const { hash, compare } = require('bcryptjs');
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    return response.json();
  }
}

module.exports = UsersController;