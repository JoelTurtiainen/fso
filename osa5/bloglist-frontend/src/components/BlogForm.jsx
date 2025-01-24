const BlogForm = ({ handleSubmit, newBlog, setNewBlog }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New</h2>
      <div>
        title:
        <input type="text"
          value={newBlog.title}
          name="blogTitle"
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        author:
        <input type="text"
          value={newBlog.author}
          name="blogAuthor"
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url:
        <input type="text"
          value={newBlog.url}
          name="blogUrl"
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
