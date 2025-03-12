import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'
import styles from '../style.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, removeBlog, isOwner }) => {
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const like = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
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
        {isOwner ? <li><button onClick={() => removeBlog(blog)} className={styles.btnRemove}>remove</button></li> : ''}
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
