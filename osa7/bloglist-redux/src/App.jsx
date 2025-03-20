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
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { Button, Nav, Navbar, Table } from 'react-bootstrap'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const padding = {
    paddingRight: 5,
  }

  const logOut = () => {
    dispatch(logOff())
    navigate('/login')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto px-4">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user ? (
              <em>
                {user.name} logged in <Button onClick={logOut}>logout</Button>
              </em>
            ) : (
              <Link to="/login">login</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Blogs = ({ blogs, user }) => {
  const ref = useRef()
  return (
    <>
      <h2>blogs</h2>
      {user && (
        <Togglable buttonLabel="create new blog" ref={ref}>
          <BlogForm ref={ref} />
        </Togglable>
      )}
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
  return (
    <Table striped>
      <thead>
        <tr>
          <th>users</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
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
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
    const userData = JSON.parse(localStorage.getItem('user'))
    dispatch(initializeUser(userData))
  }, [])

  return (
    <div className="container">
      <Menu user={user} />
      <Notification />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Blogs blogs={blogs} user={user} />} />
        <Route path="/blogs/:id" element={<BlogDetailed />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetailed users={users} />} />
      </Routes>
    </div>
  )
}

export default App
