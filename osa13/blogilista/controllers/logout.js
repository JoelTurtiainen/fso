const router = require("express").Router();

const { Session } = require("../models");
const { tokenExtractor } = require("../util/middleware");

router.delete("/", tokenExtractor, async (request, response) => {
  try {
    const session = await Session.findOne({
      where: { user_id: request.decodedToken.id },
    });
    session.token = null;
    await session.save();
    response.status(200).end();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
