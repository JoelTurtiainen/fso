const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.virtual('id').get(function() {
  return this._id.toString()
})

blogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnedObject) => {
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)
