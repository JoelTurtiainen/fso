import { useQuery } from '@apollo/client';
import Text from './Text';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const authStorage = useAuthStorage();
  const { data: currentUserObject, loading: currentUserLoading } = useQuery(
    GET_CURRENT_USER,
    {
      context: {
        headers: { authorization: `Bearer ${authStorage.getAccessToken()}` },
      },
      variables: {
        includeReviews: true,
      },
    }
  );

  if (currentUserLoading) return <Text>Loading...</Text>;
  console.log(currentUserObject.me.reviews);

  const reviewNodes = currentUserObject.me.reviews
    ? currentUserObject.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
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
