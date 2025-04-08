import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
        __typename
      }
      genres
      published
      id
      __typename
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
        bookCount
        id
        born
        __typename
      }
      published
      genres
      id
      __typename
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      born
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $favoriteGenre: String!) {
    createUser(username: $username, favoriteGenre: $favoriteGenre) {
      favoriteGenre
      id
      username
    }
  }
`;

export const LOG_IN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    genres
    published
    id
    author {
      name
      born
      id
      bookCount
    }
  }
`;

export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    id
    bookCount
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const AUTHOR_EDITED = gql`
  subscription {
    authorEdited {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;
