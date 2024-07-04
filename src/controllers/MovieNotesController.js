const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class MovieNotesController {
  async index(request, response) {
    const { user_id, title, tags } = request.query;

    let movieNotes;

    if(tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      movieNotes = await knex("movie_tags")
      .select([
        "movie_notes.id",
        "movie_notes.title",
        "movie_notes.user_id",
      ])
      .where("movie_notes.user_id", user_id)
      .whereLike("movie_notes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_note_id")
      .orderBy("movie_notes.title");

    } else {
      movieNotes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    
    const userTags = await knex("movie_tags").where({ user_id });
    const movieNotesWithTags = movieNotes.map((movieNote) => {
      const movieNoteTags = userTags.filter((tag) => tag.movie_note_id === movieNote.id);
      return {
        ...movieNote,
        tags: movieNoteTags
      }
    })
    return response.json(movieNotesWithTags);
  }
  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movie_notes").where({ id: id }).first();
    const tags = await knex("movie_tags").where({ movie_note_id: id }).orderBy("name");

    return response.json({
      ...note,
      tags,
    });
  }
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
  async delete(request, response) {
    const { id } = request.params;

    await knex("movie_notes").where({ id }).delete();

    return response.json();
  }
}

module.exports = MovieNotesController;