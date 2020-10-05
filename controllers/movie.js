const Movie = require("../models/movie");
const SeenMovie = require("../models/seen-movie");
const Rating = require("../models/rating");
const createError = require("http-errors");

exports.readAllMovies = async (req, res, next) => {
  try {
    let order = "release";
    if (req.query && req.query.order) {
      order = req.query.order;
    }
    const movies = await Movie.findAll({
      order: [order],
    });
    if (!movies) {
      return next(createError(404, "Movies Not Found!"));
    }
    res.status(200).send(movies);
  } catch (error) {
    next(createError(400, error.message));
  }
};

exports.readMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return next(createError(404, "Movie Not Found!"));
    }
    res.status(200).send(movie);
  } catch (error) {
    next(createError(400, error.message));
  }
};

exports.watchMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return next(createError(404, "Movie Not Found!"));
    }
    await movie.update({
      count: ++movie.count,
    });

    await SeenMovie.create({
      MovieId: id,
      UserId: user,
    });

    res.status(200).send(movie);
  } catch (error) {
    next(createError(400, error.message));
  }
};

exports.rateMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { rating } = req.body;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return next(createError(404, "Movie Not Found!"));
    }
    await new Rating({
      movie: id,
      rating,
    }).save();
    const ratings = await Rating.find({ movie: id });
    let total = 0;
    for (const e of ratings) {
      total += e.rating;
    }
    const average = total / ratings.length;
    await movie.update({
      rating: average.toFixed(2),
    });
    res.status(200).send(movie);
  } catch (error) {
    next(createError(400, error.message));
  }
};
