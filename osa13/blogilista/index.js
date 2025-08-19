const express = require("express");
const app = express();
const logger = require("./util/logger");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const middleware = require("./util/middleware");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const authorsRouter = require("./controllers/authors");
const readinglistsRouter = require("./controllers/readinglists");

app.use(express.json());
app.use("/api", middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readinglistsRouter);

app.use("/api", middleware.errorHandler);

app.use(middleware.unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

start();
