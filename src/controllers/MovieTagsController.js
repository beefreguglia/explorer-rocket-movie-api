const knex = require("../database/knex");

class MovieTagsController {
  async index(request, response) {
    const { user_id } = request.query;

    const tags = await knex("movie_tags")
    .where({ user_id });

    return response.json(tags);
  }
}

module.exports = MovieTagsController;