import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://10.36.67.84:4000/graphql',
    cache: new InMemoryCache(),
    queryDeduplication: false,
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};

export default createApolloClient;
