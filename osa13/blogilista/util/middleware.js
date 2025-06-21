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

  if (error.name === "SyntaxError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
