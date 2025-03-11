import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser({ username, password }))
      localStorage.setItem('user', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  return (
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
  )
}

export default LoginForm
