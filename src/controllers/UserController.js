const { hash, compare } = require('bcryptjs');
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { 
      name,
      email,
      password,
    } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.json();
  }
}

module.exports = UsersController;