const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 6)
})

test('returned blogs contain id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body.find(blog => !blog.id);
  assert(blog == undefined)
})

test('setting default likes on missing blog', async () => {
  const blogWithNolikes = {
    title: 'Pineapple Pizza',
    author: 'Pizzaman456',
    url: 'pizzaman456reviews.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(blogWithNolikes)
    .expect(201)

  assert(Number.isInteger(response.body.likes))
})

test('rejecting blog with no title & url', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const invalidBlog = {
    author: 'Pizzaman456',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('deleting a blog works', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('updating blog works', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: 10
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)

  const blogsAtEnd = await helper.blogsInDb()

  assert.notDeepStrictEqual(blogsAtEnd[0], blogsAtStart[0])
})

after(async () => {
  await mongoose.connection.close()
})


