import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import Login from './components/Login';
import { useApolloClient, useSubscription } from '@apollo/client';
import Recommend from './components/Recommend';
import { parse } from 'graphql';

export const updateCache = (cache, { query, variables = null }, newItem, uniqFilter) => {
  // helper that is used to eliminate saving same item twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item[`${uniqFilter}`];
      return seen.has(k) ? false : seen.add(k);
    });
  };

  const existingCache = cache.readQuery({ query, variables });

  if (!existingCache) {
    console.debug(`Skipping... because query is not cached`);
    return null;
  }

  const queryName = Object.keys(existingCache)[0];

  console.debug('queryName', queryName);

  cache.writeQuery({
    query: query,
    variables: variables,
    data: {
      [queryName]: uniqByName(existingCache[queryName].concat(newItem)),
    },
  });
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const client = useApolloClient();

  useEffect(() => {
    setPage('authors');
  }, [loggedIn]);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setLoggedIn(false);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {loggedIn ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} setError={notify} />

      <NewBook show={page === 'add'} setError={notify} />

      <Recommend show={page === 'recommend'} />

      <Login show={page === 'login'} setError={notify} setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default App;
