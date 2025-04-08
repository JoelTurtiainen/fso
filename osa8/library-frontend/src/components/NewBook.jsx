import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries';
import { updateCache } from '../App';

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
      console.debug('response.data', response.data);

      console.debug('Updating ALL_BOOKS');
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook, 'title');

      console.debug('Updating Books By Genre');
      const genres = response.data.addBook.genres;

      genres.forEach((genre) => {
        console.debug('genre', genre);
        updateCache(cache, { query: ALL_BOOKS, variables: { genre: genre } }, response.data.addBook, 'title');
      });

      console.debug('Updating Authors');
      updateCache(cache, { query: ALL_AUTHORS }, response.data.addBook.author, 'name');
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
