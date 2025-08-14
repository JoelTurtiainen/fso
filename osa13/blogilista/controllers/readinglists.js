const { UserBlogs } = require("../models");

const router = require("express").Router();

router.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    const reading = await UserBlogs.create({
      blogId: body.blog_id,
      userId: body.user_id,
    });
    response.json(reading);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
