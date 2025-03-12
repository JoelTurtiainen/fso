import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.concat(newBlog))
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    newBlogMutation.mutate(newBlog)
    setNewBlog({ title: '', url: '', author: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create New</h2>
      <div>
        title:
        <input type="text"
          value={newBlog.title}
          aria-label="blogTitle"
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        author:
        <input type="text"
          value={newBlog.author}
          aria-label="blogAuthor"
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url:
        <input type="text"
          value={newBlog.url}
          aria-label="blogUrl"
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
