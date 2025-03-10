import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = ({ user, blogs, setBlogs }) => {
  const dispatch = useDispatch()

  const updateBlog = async (blogObject) => {
    // Only used for updating likes at the moment
    try {
      const response = await blogService.update(blogObject, user)
      setBlogs(blogs.map((blog) => blog.id !== response.id ? blog : { ...response, user }))
      dispatch(setNotification(`liked blog '${blogObject.title}'`))
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blogObject) => {
    if (!confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) return

    try {
      await blogService.remove(blogObject.id, user)
      setBlogs(blogs.filter(blog => blog !== blogObject))

      dispatch(setNotification(`Removed blog ${blogObject.title} by ${blogObject.author}`))
    } catch ({ status }) {
      if (status === 401 && user.username === blogObject.user.username) {
        dispatch(setNotification('Token Expired'))
      } else if (status === 401) {
        dispatch(setNotification('Could not delete the blog, Are you the author?'))
      } else {
        dispatch(setNotification('Uh oh'))
      }
    }
  }

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) =>
          <Blog
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            isOwner={user.username === blog.user.username}
            key={blog.id}
            blog={blog}
          />
        )}
    </div>
  )
}

export default BlogList
