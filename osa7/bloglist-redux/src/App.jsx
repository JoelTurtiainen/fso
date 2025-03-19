import { useEffect, useRef, useState } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logOff } from './reducers/credentialReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch,
} from 'react-router-dom'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const padding = {
    paddingRight: 5,
  }

  const logOut = () => {
    dispatch(logOff())
    navigate('/login')
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          {user.name} logged in <button onClick={logOut}>logout</button>
        </>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  )
}

const Blogs = ({ blogs }) => {
  const ref = useRef()
  return (
    <>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <BlogForm ref={ref} />
      </Togglable>
      <BlogList blogs={blogs} />
    </>
  )
}

const BlogDetailed = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const match = useMatch('blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  if (!blog) return null
  return (
    <Blog
      isOwner={user && blog.user.username === user.username}
      key={blog.id}
      blog={blog}
    />
  )
}

const Users = (props) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td style={padding}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={padding}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const UserDetailed = ({ users }) => {
  const match = useMatch('users/:id')
  const userDetails = match
    ? users.find((user) => user.id === match.params.id)
    : null
  if (!userDetails) return null
  return (
    <>
      <BlogList blogs={userDetails.blogs} />
    </>
  )
}

const Login = () => {
  return (
    <div>
      <Notification />
      <h2>Log in to application</h2>
      <LoginForm />
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
    const userData = JSON.parse(localStorage.getItem('user'))
    dispatch(initializeUser(userData))
  }, [])

  return (
    <div>
      <Menu />
      <Notification />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogDetailed />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetailed users={users} />} />
      </Routes>
    </div>
  )
}

export default App
