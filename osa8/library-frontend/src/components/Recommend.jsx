import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';
import { useMemo } from 'react';

const Recommend = (props) => {
  const resultUser = useQuery(ME);
  const favoriteGenre = useMemo(() => resultUser.data?.me?.favoriteGenre, [resultUser]);
  const resultBook = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  });

  if (!props.show) {
    return null;
  }

  if (resultUser.loading || !resultBook.data) {
    return 'loading...';
  }

  const books = resultBook.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favourite genre <b>{favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books &&
            books.map((a) => (
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

export default Recommend;
