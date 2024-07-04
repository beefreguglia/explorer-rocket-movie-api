const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class MovieNotesController {
  async create(request, response) {
    const { 
      title,
      description,
      rating,
      tags
    } = request.body;
    const { user_id } = request.params;

    const [movie_note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });
    
    if(tags) {
      const tagsInsert = tags.map((name) => ({
        movie_note_id,
        user_id,
        name,
      }))
  
      await knex("movie_tags").insert(tagsInsert);
    }
2
    return response.json();
  }
}

module.exports = MovieNotesController;