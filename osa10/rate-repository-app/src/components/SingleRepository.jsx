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
  const repoId = useParams();
  const { reviews, loading: reviewsLoading } = useReviews(repoId);
  const { repository, loading: repositoryLoading } = useRepository(repoId);

  if (reviewsLoading || repositoryLoading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
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
