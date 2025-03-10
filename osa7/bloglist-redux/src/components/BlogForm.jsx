import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const BlogForm = ({ user, blogs, setBlogs, ref }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()
  console.log(ref)

  const newBlogHandler = async (event) => {
    event.preventDefault()
    let msg

    try {
      const returnedBlog = await blogService.create(newBlog, user)
      setBlogs(blogs.concat({ ...returnedBlog, user }))
      setNewBlog({ title: '', url: '', author: '' })

      msg = `a new Blog ${returnedBlog.title} by ${returnedBlog.author} added`
      ref.current.toggleVisibility()
    } catch ({ status }) {
      if (status === 401) {
        msg = 'Token Expired'
      } else if (status === 400) {
        msg = 'Invalid Blog Body'
      } else {
        msg = 'Unknown Error'
      }
    }
    dispatch(setNotification(msg))
  }

  return (
    <form onSubmit={newBlogHandler}>
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

//BlogForm.propTypes = {
//  createBlog: PropTypes.func.isRequired
//}

export default BlogForm
