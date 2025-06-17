const router = require("express").Router();

const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
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

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    next(error);
    return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
      return res.status(200).end();
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
