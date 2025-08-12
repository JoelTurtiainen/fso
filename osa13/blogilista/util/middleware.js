const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = require("./config");
const logger = require("./logger");

const requestLogger = (req, _res, next) => {
  logger.info("---");
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (_request, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  logger.info("error.name", error.name);
  logger.error("error.message", error.message);
  logger.info("error", error);

  switch (error.name) {
    case "SyntaxError":
      return res.status(400).send({ error: error.message });
    case "SequelizeDatabaseError":
      return res.status(400).json({ error: error.message });
    case "SequelizeValidationError":
      const { validatorKey, path } = error.errors[0];
      return res.status(400).json({
        error: [`Validation ${validatorKey} on ${path} failed`],
      });
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({ error: error.errors[0].message });

    default:
      break;
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not permitted" });
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  isAdmin,
};
