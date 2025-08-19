const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Session extends Model {}

Session.init(
  {
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "session",
  },
);

module.exports = Session;
