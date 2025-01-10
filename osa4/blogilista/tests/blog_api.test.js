const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { initialBlogs } = require('./test_data')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { isNumber } = require('node:util')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
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
after(async () => {
  await mongoose.connection.close()
})
