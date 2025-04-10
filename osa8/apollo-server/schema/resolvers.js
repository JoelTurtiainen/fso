const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (!foundAuthor) return [];
        query.author = foundAuthor._id;
      }
      if (args.genre) {
        query.genres = args.genre;
      }
      return Book.find(query).populate('author', {
        name: 1,
        born: 1,
      });
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  User: {
    username: (root) => root.username,
    favoriteGenre: (root) => root.favoriteGenre,
    id: (root) => root.id,
  },
  Author: {
    bookCount: async ({ id }) => {
      return Book.where({ author: id }).countDocuments();
    },
    allBooks: async ({ id }) => {
      return Book.find({ author: id });
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save().catch((error) => {
          throw new GraphQLError('Author should be atleast 4 characters long', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        });
      }

      const book = new Book({ ...args, author });

      await book.save().catch((error) => {
        throw new GraphQLError(
          book.title.length < 5 ? 'Title should be atleast 5 characters long' : 'Title needs to be unique',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error,
            },
          }
        );
      });

      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new GraphQLError('author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: Number(args.setBornTo) },
        { new: true, runValidators: true, context: 'query' }
      );
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });
      return user.save().catch((error) => {
        throw new GraphQLError('Creating new user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
