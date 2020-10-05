const User = require("../models/user");
const createError = require("http-errors");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return next(createError(400, "Email Already Exists!"));
    }
    await User.create({
      name,
      email,
      password,
    });
    res.status(200).send(user);
  } catch (error) {
    next(createError(400, error.message));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      return next(createError(404, "User Not Found!"));
    }
    res.status(200).send(user);
  } catch (error) {
    next(createError(400, error.message));
  }
};
