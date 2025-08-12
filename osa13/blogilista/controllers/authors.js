const { Blog } = require("../models");
const { sequelize } = require("../util/db");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const out = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
  });
  res.json(out);
});
module.exports = router;
