import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,

  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <ul style={{ ...showWhenVisible, listStyleType: 'none', paddingLeft: '0.5em', marginBlock: '0.2em' }}>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>likes {blog.likes}</li>
        <li>{blog.user.name}</li>
      </ul>
    </div>
  )
}

export default Blog
