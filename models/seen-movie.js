const { DataTypes } = require("sequelize");
const sequelize = require("../util/sequelize");

const User = sequelize.define("SeenMovie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = User;
