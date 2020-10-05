const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const sequelize = require("./sequelize");
const User = require("../models/user");
const Movie = require("../models/movie");
const SeenMovie = require("../models/seen-movie");

Movie.belongsToMany(User, { through: SeenMovie });

exports.initDB = (callback) => {
  sequelize
    // .sync({
    //   force: true,
    // })
    .sync()
    .then(() => {
      console.log("Sequelize Connected.");
      loadMovies();
      initMongoDB(callback);
    })
    .catch((err) => {
      console.log("Sequelize Error.", err);
      process.exit(0);
    });
};

function loadMovies() {
  Movie.findAll()
    .then((movies) => {
      if (movies.length === 0) {
        const raw = fs.readFileSync(path.join(__dirname, "../", "data.json"));
        const movies = JSON.parse(raw);
        Movie.bulkCreate(movies);
        console.log("Movies Loaded");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function initMongoDB(callback) {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(err);
      process.exit(0);
    });
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected.");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Error.", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected.");
  process.exit(0);
});
