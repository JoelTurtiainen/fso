const express = require("express");
const app = express();
const logger = require("./util/logger");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const middleware = require("./util/middleware");

app.use(express.json());
app.use("/api", middleware.requestLogger);
app.use("/api/blogs", blogsRouter);

app.use("/api", middleware.errorHandler);
app.use(middleware.unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

start();
