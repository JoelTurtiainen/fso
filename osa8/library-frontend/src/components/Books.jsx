import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useEffect, useState } from 'react';
import styles from '../style.module.css';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all');
  const [genres, setGenres] = useState(['all']);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.loading) return;
    setGenres(['all', ...new Set(books.flatMap((book) => book.genres))]);
  }, [result]);

  if (result.loading) {
    return 'loading...';
  }

  const books = result.data.allBooks;
  const booksToShow = genreFilter === 'all' ? books : books.filter((book) => book.genres.includes(genreFilter));

  if (!props.show) {
    return null;
  }

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
          {booksToShow.map((a) => (
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
