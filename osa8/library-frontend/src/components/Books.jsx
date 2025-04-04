import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState, useEffect } from 'react';
import styles from '../style.module.css';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all');
  const [genres, setGenres] = useState(['all']);
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
    variables: genreFilter !== 'all' && { genre: genreFilter },
  });

  useEffect(() => {
    if (result.loading || !result.data) {
      return;
    }
    setGenres([...new Set(genres.concat(result.data?.allBooks.flatMap((book) => book.genres)))]);
  }, [result]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return 'loading...';
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <div>
        <h3>filter</h3>
        {genres.map((genre) => (
          <button
            key={genre}
            className={genreFilter === genre ? styles['button-black'] : styles['button-gray']}
            type="button"
            value={genre}
            onClick={() => setGenreFilter(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
