const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id); //.populate('user', { username: 1, name: 1 })
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url || !body.author) {
    return response.status(400).json({ error: "invalid body" });
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes || 0,
    comments: body.comments,
  });

  await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  await blog.populate("user", { username: 1, name: 1 });
  response.status(201).json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(401).json({ error: "blog does not exist" });
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne(blog);
  } else {
    return response
      .status(401)
      .json({ error: "blog does not belong to current user" });
  }

  response.json(blog);
});

blogsRouter.put("/:id", async (request, response) => {
  delete request.body.user;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: "query" },
  );

  response.json(updatedBlog).end();
});

module.exports = blogsRouter;
