import { useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    dispatch(setNotification(`you created '${newBlog.title}'`, 5))
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

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
