const ReadingList = require("../models/reading_list");

const router = require("express").Router();

router.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    const reading = await ReadingList.create({
      blogId: body.blog_id,
      userId: body.user_id,
    });
    response.json(reading);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
