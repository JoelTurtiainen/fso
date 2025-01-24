import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [message, setMessage] = useState({ text: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null))
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      // Save user to localstorage 
      setUser(user)
      // Clear input fields
      setUsername('')
      setPassword('')
    } catch (exception) {
      // Notification message & Timeout 
      setMessage({ text: 'wrong username or password', error: true })
      setTimeout(() => {
        setMessage({ text: null })
      }, 5000)
    }
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create(newBlog, user)

      // Clear input Fields
      setNewBlog({ title: '', url: '', author: '' })

      // Add newly created blog to DOM
      setBlogs(blogs.concat(response))

      // Notification message & Timeout 
      setMessage({ text: `a new Blog ${response.title} by ${response.author} added`, error: false })
      setTimeout(() => {
        setMessage({ text: null })
      }, 5000)
    } catch ({ status }) {
      // Set Notification text & color based on returned status code
      if (status === 401) {
        setMessage({ text: 'Token Expired', error: true })
      } else if (status === 400) {
        setMessage({ text: 'Invalid blog body', error: true })
      } else {
        setMessage({ text: 'Uh oh', error: true })
      }
      // Timeout for Notification 
      setTimeout(() => {
        setMessage({ text: null })
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        < Notification message={message} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      < Notification message={message} />
      <h2>blogs</h2>

      <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>

      <Togglable buttonLabel="New note">
        <BlogForm
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          handleSubmit={handleBlogSubmit}
        />
      </Togglable>

      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
