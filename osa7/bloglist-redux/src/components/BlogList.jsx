import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  console.log(blogs)

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
    if (!confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) return
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
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) =>
          <Blog
            updateBlog={updateHandler}
            removeBlog={removeHandler}
            isOwner={user.username === blog.user.username}
            key={blog.id}
            blog={blog}
          />
        )}
    </div>
  )
}

export default BlogList
