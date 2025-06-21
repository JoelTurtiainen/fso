const info = (...params) => {
  // if (process.env.NODE_ENV !== "test") {
  console.log("\x1b[33m%s\x1b[0m", ...params);
  // }
};

const error = (...params) => {
  // if (process.env.NODE_ENV !== "test") {
  console.error("\x1b[31m%s\x1b[0m", ...params);
  // }
};

module.exports = {
  info,
  error,
};
