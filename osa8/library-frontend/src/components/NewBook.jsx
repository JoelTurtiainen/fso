import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      props.setError(messages);
    },
    update: (cache, response) => {
      console.log('response', response);
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const foundAuthor = allAuthors.find((author) => author.id === response.data.addBook.author.id);
        return {
          allAuthors: foundAuthor
            ? allAuthors.filter((author) => author.id !== foundAuthor.id).concat({ ...foundAuthor })
            : allAuthors.concat(response.data.addBook.author),
        };
      });
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log('add book...');

    createBook({ variables: { title, author, published: Number(published), genres } });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Add Book</h2>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <button onClick={addGenre} type="button">
            add genre
          </button>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
