const router = require("express").Router();

const { Op } = require("sequelize");
const { User, Blog, ReadingList } = require("../models");
const { isAdmin, tokenExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  let where = {};
  const { read } = req.query;

  if (read === "true" || read === "false") {
    where = {
      read: {
        [Op.eq]: read,
      },
    };
  }

  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "username"],
      include: [
        {
          model: Blog,
          as: "readings",
          attributes: { exclude: ["userId"] },
          through: { attributes: [] },
          include: [
            {
              model: ReadingList,
              attributes: ["read", "id"],
              where,
            },
          ],
        },
      ],
    });
    res.json(user);
  } catch (err) {
    res.status(404).end();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
