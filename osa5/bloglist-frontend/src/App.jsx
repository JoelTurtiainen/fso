import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [message, setMessage] = useState({ text: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null))
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
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
      setMessage({ text: `a new Blog ${response.title} by ${response.author} added`, error: false })
      setNewBlog({ title: '', url: '', author: '' })
      setTimeout(() => {
        setMessage({ text: null })
      }, 5000)
    } catch ({ status }) {
      if (status === 401) {
        setMessage({ text: 'Token Expired', error: true })
      } else if (status === 400) {
        setMessage({ text: 'Invalid blog', error: true })
      } else {
        setMessage({ text: 'Uh oh', error: true })
      }
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
      <h2>blogs</h2>
      < Notification message={message} />
      <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input type="text"
            value={newBlog.title}
            name="blogTitle"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input type="text"
            value={newBlog.author}
            name="blogAuthor"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          url:
          <input type="text"
            value={newBlog.url}
            name="blogUrl"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
