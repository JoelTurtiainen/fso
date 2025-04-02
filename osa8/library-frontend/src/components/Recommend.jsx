import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommend = (props) => {
  const resultBook = useQuery(ALL_BOOKS);
  const resultUser = useQuery(ME);

  if (!props.show || !resultUser.data) {
    return null;
  }

  if (!resultUser.data.me) {
    resultUser.refetch();
  }

  if (resultBook.loading || resultUser.loading) {
    return 'loading...';
  }

  const books = resultBook.data.allBooks;
  const favoriteGenre = resultUser.data.me ? resultUser.data.me.favoriteGenre : '';
  const booksToShow = books.filter((book) => book.genres.includes(favoriteGenre));

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

export default Recommend;
