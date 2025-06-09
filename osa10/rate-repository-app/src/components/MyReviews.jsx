import { useQuery } from '@apollo/client';
import Text from './Text';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const authStorage = useAuthStorage();
  const {
    data: currentUserObject,
    loading: currentUserLoading,
    refetch,
  } = useQuery(GET_CURRENT_USER, {
    context: {
      headers: { authorization: `Bearer ${authStorage.getAccessToken()}` },
    },
    variables: {
      includeReviews: true,
    },
  });

  if (!currentUserObject?.me || currentUserLoading)
    return <Text>Loading...</Text>;

  const reviewNodes = currentUserObject.me.reviews
    ? currentUserObject.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default MyReviews;
