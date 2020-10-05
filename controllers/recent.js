const Movie = require("../models/movie");
const SeenMovie = require("../models/seen-movie");
const createError = require("http-errors");

exports.recentMovies = async (req, res, next) => {
  const { id } = req.params;
  try {
    const seenMovies = await SeenMovie.findAll({
      where: {
        UserId: id,
      },
    });
    const ids = seenMovies.map((e) => e.MovieId);
    console.log(seenMovies);
    console.log(ids);
    const movies = await Movie.findAll({
      where: {
        id: ids,
      },
    });
    if (!movies) {
      return next(createError(404, "Movies Not Found!"));
    }
    res.status(200).send(movies);
  } catch (error) {
    next(createError(400, error.message));
  }
};
