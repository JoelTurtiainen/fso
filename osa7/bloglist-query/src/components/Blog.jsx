import PropTypes from 'prop-types'
import { useState } from 'react'
import { updateBlog, removeBlog } from '../services/blogs'
import styles from '../style.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../notificationContext'
import { useUserDispatch, useUserValue } from '../services/userContext'

const Blog = ({ blog, isOwner }) => {
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const user = useUserValue()

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (removedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter((blog) => blog.id !== removedBlog.id))
      notificationDispatch({ type: 'error', content: `Removed blog ${removedBlog.title} by ${removedBlog.author}` })
    },
    onError: (error) => {
      switch (error.status) {
        case 401 && isOwner:
          return notificationDispatch({ type: 'error', content: 'Login Expired' })
        case 401:
          return notificationDispatch({ type: 'error', content: 'Could not delete the blog, Are you the author?' })
        default:
          return notificationDispatch({ type: 'error', content: 'Unknown Error' })
      }
    }
  })

  const like = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const remove = (blogId) => {
    removeBlogMutation.mutate({ blogId, user })
  }

  return (
    <div className={styles.blog}>
      <ul className={styles.title}>
        <li>{blog.title}</li>
        <li>{blog.author}</li>
        <li><button onClick={toggleVisibility}>{buttonText}</button></li>
      </ul>
      <ul style={showWhenVisible} >
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>likes {blog.likes} <button onClick={() => like(blog)}>like</button></li>
        <li>{blog.user.name}</li>
        {isOwner
          ? <li><button onClick={() => remove(blog.id)} className={styles.btnRemove}>remove</button></li>
          : ''}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  removeBlog: PropTypes.func,
  isOwner: PropTypes.bool
}

export default Blog
