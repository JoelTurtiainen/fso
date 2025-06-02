import { FlatList, View, StyleSheet } from 'react-native';
import useReviews from '../hooks/useReviews';

const ReviewItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text>{data.createdAt}</Text>
    </View>
  );
};

export default ReviewItem;
const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewListContainer = ({ reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem data={item} />}
    />
  );
};

const ReviewList = ({ id }) => {
  const { repository, loading } = useReviews(id);
  return (
    <ReviewListContainer
      style={styles.container}
      reviews={repository?.reviews}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
