import { useState, useEffect, useRef } from 'react'
import { getBlogs, createBlog } from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './notificationContext'
import { useUserValue, useUserDispatch } from './services/userContext'
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notificationDispatch({ type: 'added', content: newBlog.title })
    },
    onError: (error) => {
      switch (error.status) {
        case 401:
          return notificationDispatch({ type: 'error', content: 'Login Expired' })
        case 400:
          return notificationDispatch({ type: 'error', content: 'Invalid Blog Body' })
        default:
          return notificationDispatch({ type: 'error', content: 'Unknown Error' })
      }
    }
  })

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    newBlogMutation.mutate({ newBlog, user })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginService.login({ username, password })
      console.log('user: ', response)
      userDispatch({ type: 'loggedin', payload: response })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({ type: 'error', content: 'wrong username or password' })
    }
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const blogFormRef = useRef()

  const blogs = result.data

  if (user === null) {
    return (
      <div>
        < Notification />
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

  return (
    <div>
      <h2>blogs</h2>
      < Notification />
      <p>{user.name} logged in <button onClick={() => userDispatch({ type: 'loggedout' })}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {result.isLoading ? (
        'loading data...'
      ) : (
        <div>
          {blogs.sort((a, b) => b.likes - a.likes)
            .map((blog) =>
              <Blog
                isOwner={user.username === blog.user.username}
                key={blog.id}
                blog={blog}
              />
            )
          }
        </div>
      )}
    </div>
  )
}

export default App
