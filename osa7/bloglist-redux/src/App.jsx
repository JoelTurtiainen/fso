import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null))
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const ref = useRef()

  // LOGIN PAGE
  if (!user) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} />
      </div>
    )
  }

  // HOME PAGE
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} user={user} ref={ref} />
      </Togglable>
      <BlogList user={user} blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default App
