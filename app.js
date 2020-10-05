const express = require("express");
const createError = require("http-errors");
const app = express();
const cors = require("cors");
require("dotenv").config();
const db = require("./util/db");

//PORT
const port = process.env.PORT || 8080;

const init = () => {
  app.listen(port, () => {
    console.log("Express is running in", port);
  });
};

//db.initDB(init);
db.initDB(init);

//Cross Origin
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/api", (req, res) => {
  res.send({
    success: true,
    message: "Epita is Running Successfully",
  });
});

//Routes
const AuthRoutes = require("./routes/auth");
const MovieRoutes = require("./routes/movie");
const RecentRoutes = require("./routes/recent");

//Use Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/movie", MovieRoutes);
app.use("/api/recent", RecentRoutes);

//Invalid Endpoint Handler
app.use((req, res, next) => {
  const err = createError(404, "Invalid Endpoint.");
  next(err);
});

//Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
