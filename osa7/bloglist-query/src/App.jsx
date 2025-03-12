import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const [message, setMessage] = useState({ text: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null))

  const queryClient = useQueryClient()

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user) // Save user to localstorage
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ text: 'wrong username or password', error: true })
    }

    setTimeout(() => {
      setMessage({ text: null })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const blogFormRef = useRef()

  const blogs = result.data
  if (user === null) {
    return (
      <div>
        < Notification message={message} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type="text"
              value={username}
              aria-label="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type="password"
              value={password}
              aria-label="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      < Notification message={message} />
      <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) =>
          <Blog
            isOwner={user.username === blog.user.username}
            key={blog.id}
            blog={blog}
          />
        )
      }
    </div>
  )
}

export default App
