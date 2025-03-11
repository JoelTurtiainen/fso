import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  })

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
        <BlogForm user={user} ref={ref} />
      </Togglable>
      <BlogList user={user} />
    </div>
  )
}

export default App
