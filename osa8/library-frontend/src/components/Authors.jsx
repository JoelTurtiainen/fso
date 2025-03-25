import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries';
import { useEffect, useState } from 'react';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor, editResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log(messages);
    },
  });

  useEffect(() => {
    if (editResult.data && editResult.data.editAuthor === null) {
      props.setError('person not found');
    }
  }, [editResult.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return 'loading...';
  }

  const authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(born) } });
    console.log(event);
  };
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
        <div>
          {'name '}
          <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
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
