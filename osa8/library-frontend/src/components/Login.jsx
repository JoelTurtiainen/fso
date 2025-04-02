import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { CREATE_USER, LOG_IN } from '../queries';

const Login = (props) => {
  const [action, setAction] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [loginUser] = useMutation(LOG_IN, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      props.setError(messages);
    },
  });
  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      props.setError(messages);
    },
  });

  const submit = async (e) => {
    e.preventDefault();
    if (action === 'login') {
      const user = await loginUser({ variables: { username, password } });
      localStorage.setItem('token', user.data.login.value);
      props.setLoggedIn(true);
    } else if (action === 'register') {
      const user = await createUser({ variables: { username, favoriteGenre } });
      if (user.data) {
        setAction('login');
      }
    }
  };

  if (!props.show) {
    return null;
  }

  if (action === 'login') {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={username}
              type="text"
              name="username"
              autoComplete="username"
              required
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <a href="#" onClick={() => setAction('register')}>
          To Sign up
        </a>
      </div>
    );
  }

  if (action === 'register') {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={username}
              type="text"
              name="username"
              autoComplete="username"
              required
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="secret"
              disabled
            />
          </div>
          <div>
            <label htmlFor="favorite-genre">Favorite Genre</label>
            <input
              value={favoriteGenre}
              type="text"
              name="favorite-genre"
              required
              onChange={({ target }) => setFavoriteGenre(target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <a href="#" onClick={() => setAction('login')}>
          To Login
        </a>
      </div>
    );
  }
};
export default Login;
