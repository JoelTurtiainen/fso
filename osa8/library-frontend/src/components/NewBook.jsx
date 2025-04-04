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
      const oldBooks = cache.readQuery({ query: ALL_BOOKS, variables: { genre: genre } });

      // All Books
      if (oldBooks) {
        const newBook = { ...response.data.AddBook };
        console.debug('newBook', newBook);

        cache.writeQuery({
          query: ALL_BOOKS,
          data: {
            allBooks: [...oldBooks.allBooks, newBook],
          },
        });
      } else {
        console.debug('ALL_BOOKS is not cached. Skipping...');
      }

      // Books By Genre
      const genres = response.data.addBook.genres;
      console.debug('genres', genres);

      genres.forEach((genre) => {
        const oldBooksByGenre = cache.readQuery({ query: ALL_BOOKS, variables: { genre: genre } });
        console.debug('oldBooksByGenre', oldBooksByGenre);

        if (!oldBooksByGenre) {
          console.debug(`no cache found with genre: ${genre}. Skipping...`);
          return null;
        }

        const newBookByGenre = {
          ...response.data.addBook,
        };

        console.debug('newBooksByGenre', newBookByGenre);

        cache.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: genre },
          data: {
            allBooks: [...oldBooksByGenre.allBooks, newBookByGenre],
          },
        });
      });

      // Authors
      const oldAuthors = cache.readQuery({ query: ALL_AUTHORS });
      console.debug('oldAuthors', oldAuthors);

      if (!oldAuthors) {
        console.debug('Authors is not cached. Skipping...');
        return null;
      }

      const newAuthor = {
        ...response.data.addBook.author,
      };

      console.debug('newAuthor', newAuthor);

      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: [...oldAuthors.allAuthors, newAuthor],
        },
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
