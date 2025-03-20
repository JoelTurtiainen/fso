import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/credentialReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser({ username, password }))
      localStorage.setItem('user', user)
      setUsername('')
      setPassword('')
      navigate('/')
      dispatch(setNotification(`welcome ${username}`))
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          data-testid="username"
          type="text"
          autoComplete="username"
          value={username}
          aria-label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password:</Form.Label>
        <Form.Control
          data-testid="password"
          type="password"
          autoComplete="current-password"
          value={password}
          aria-label="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button vartiant="primary" type="submit">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
