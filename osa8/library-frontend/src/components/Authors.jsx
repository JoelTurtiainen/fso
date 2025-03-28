import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries';
import { useEffect, useState } from 'react';

const Authors = (props) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState('');
  const [authors, setAuthors] = useState(null);
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor, editResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      props.setError(messages);
    },
  });

  useEffect(() => {
    if (result.loading) return;
    setAuthors(result.data.allAuthors);
    setName(result.data.allAuthors[0].name);
  }, [result.data]);

  if (result.loading || !authors) {
    return 'loading...';
  }

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo: Number(born) } });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <h2>Set Birthyear</h2>
        {'name '}
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          {'born '}
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
