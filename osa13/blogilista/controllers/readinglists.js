const { Op } = require("sequelize");
const ReadingList = require("../models/reading_list");
const { tokenExtractor } = require("../util/middleware");

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

router.put("/:id", tokenExtractor, async (request, response, next) => {
  const { id } = request.params;
  const { read } = request.body;

  const where = {
    [Op.and]: [
      {
        user_id: {
          [Op.eq]: request.decodedToken.id,
        },
      },
      {
        id: {
          [Op.eq]: id,
        },
      },
    ],
  };

  const readinglist = await ReadingList.findOne({ where });

  if (!readinglist) {
    response.json({
      error: `readinglist not found`,
    });
  }

  try {
    readinglist.read = read;
    await readinglist.save();
    response.json(readinglist);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
