const Sequelize = require("sequelize");
const log = require("sequelize-pretty-logger")();
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  logging: log,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
