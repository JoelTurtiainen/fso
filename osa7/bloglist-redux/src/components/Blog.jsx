import PropTypes from 'prop-types'
import styles from '../style.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, updateBlog, removeBlog, isOwner }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const updateHandler = async (blogObject) => {
    // Only used for updating likes at the moment
    try {
      dispatch(likeBlog(blogObject.id))
      dispatch(setNotification(`liked blog '${blogObject.title}'`))
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeHandler = async (blogObject) => {
    if (!confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`))
      return
    let msg

    try {
      dispatch(removeBlog(blogObject.id, user))
      msg = `Removed blog ${blogObject.title} by ${blogObject.author}`
    } catch ({ status }) {
      if (status === 401 && user.username === blogObject.user.username) {
        msg = 'Token Expired'
      } else if (status === 401) {
        msg = 'Could not delete the blog, Are you the author?'
      } else {
        msg = 'Uh oh'
      }
    }
    dispatch(setNotification(msg))
  }

  return (
    <div className={styles.blog}>
      <ul className={styles.title}>
        <li>
          <h2>{blog.title}</h2>
        </li>
        <li>{blog.author}</li>
      </ul>
      <ul>
        <li>
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          {`likes ${blog.likes} `}
          <button onClick={() => updateHandler(blog)}>like</button>
        </li>
        <li>{blog.user.name}</li>
        {isOwner ? (
          <li>
            <button
              onClick={() => removeHandler(blog, user)}
              className={styles.btnRemove}
            >
              remove
            </button>
          </li>
        ) : (
          ''
        )}
      </ul>
      <h3>comments</h3>
      {blog.comments ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        'no comments'
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  removeBlog: PropTypes.func,
  isOwner: PropTypes.bool,
}

export default Blog
