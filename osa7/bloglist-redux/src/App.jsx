import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logOff } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      dispatch(initializeUser(userData))
    }
  }, [])

  const logOut = () => {
    dispatch(logOff())
  }

  const ref = useRef()

  // LOGIN PAGE
  if (!user) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  // HOME PAGE
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <BlogForm ref={ref} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App
