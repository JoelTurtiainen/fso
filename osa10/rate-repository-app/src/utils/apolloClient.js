import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => {
  const apolloUri = Constants.expoConfig.extra.apolloUri;

  return new ApolloClient({
    uri: `http://${apolloUri}:4000/graphql`,
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
