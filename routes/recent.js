const router = require("express").Router();
const RecentController = require("../controllers/recent");

router.get("/:id", RecentController.recentMovies);

module.exports = router;
