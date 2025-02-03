import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, isOwner }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const btnRmStyle = {
    backgroundColor: '#008CBA',
    borderRadius: '5px',
    border: '1px solid black',
    aspectRatio: '4/1'
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <ul style={{ ...showWhenVisible, listStyleType: 'none', paddingLeft: '0.5em', marginBlock: '0.2em' }}>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>likes {blog.likes} <button onClick={addLike}>like</button></li>
        <li>{blog.user.name}</li>
        {isOwner ? <li><button onClick={() => removeBlog(blog)} style={btnRmStyle}>remove</button></li> : ''}
      </ul>
    </div>
  )
}

export default Blog
