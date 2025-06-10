import RepositoryItem from './RepositoryItem/Index';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList } from 'react-native';
import useReviews from '../hooks/useReviews';
import Text from './Text';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem data={repository} showLink={true} />
);

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const {
    reviews,
    loading: reviewsLoading,
    fetchMore,
  } = useReviews({ id, first: 7 });
  const { repository, loading: repositoryLoading } = useRepository({ id });

  if (reviewsLoading || repositoryLoading) return <Text>Loading...</Text>;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReached = () => {
    fetchMore();
  };
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
      onEndReached={reviewNodes.length && onEndReached}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  item: {
    flexDirection: 'column',
    gap: 5,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});
