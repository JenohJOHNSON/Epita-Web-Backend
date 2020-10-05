const router = require("express").Router();
const MovieController = require("../controllers/movie");

router.get("/", MovieController.readAllMovies);

router.get("/:id", MovieController.readMovie);

router.put("/:id", MovieController.watchMovie);

router.post("/:id", MovieController.rateMovie);

module.exports = router;
