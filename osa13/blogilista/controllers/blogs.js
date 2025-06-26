const router = require("express").Router();

const jwt = require("jsonwebtoken");

const { Blog, User } = require("../models");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: "%" + req.query.search + "%",
          },
        },
        {
          author: {
            [Op.iLike]: "%" + req.query.search + "%",
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    order: [["likes", "DESC"]],
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    return res.json(blog);
  } catch (error) {
    next(error);
    // return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, blogFinder, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    if (req.blog && req.blog?.userId === user.id) {
      await req.blog.destroy();
      return res.status(200).end();
    } else if (req.blog) {
      return res.status(401).end();
    } else {
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json({ likes: req.blog.likes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
