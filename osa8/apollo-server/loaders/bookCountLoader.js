const DataLoader = require('dataloader');
const Book = require('../models/book');

const bookCountLoader = new DataLoader(async (authorIds) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: '$author', count: { $sum: 1 } } },
  ]);

  const countMap = {};
  counts.forEach((item) => {
    countMap[item._id.toString()] = item.count;
  });

  return authorIds.map((id) => countMap[id.toString()] || 0);
});

module.exports = bookCountLoader;
