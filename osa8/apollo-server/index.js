const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
    allBooks: [Book!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

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
      return Book.find(query).populate("author", {
        name: 1,
        born: 1,
      });
    },
    allAuthors: async () => Author.find({}),
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
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        author = await author.save();
      }

      const book = new Book({ ...args, author });
      return book.save();
    },
    editAuthor: async (root, args) => {
      const author = Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: Number(args.setBornTo) },
        { new: true, runValidators: true, context: "query" },
      );

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
