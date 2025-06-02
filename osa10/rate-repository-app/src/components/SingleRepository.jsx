import RepositoryItem from './RepositoryItem/Index';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList } from 'react-native';
import useReviews from '../hooks/useReviews';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem data={repository} showLink={true} />
);

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.rating} color={'primary'} fontWeight={'bold'}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewEnd}>
        <Text fontWeight={'bold'}>{review.user.username}</Text>
        <Text color={'textSecondary'}>
          {format(review.createdAt, 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const repoId = useParams();
  const { reviews, loading: reviewsLoading } = useReviews(repoId);
  const { repository, loading: repositoryLoading } = useRepository(repoId);

  if (reviewsLoading && repositoryLoading) return;

  if (reviews.length === 0) {
    console.log('bruh');
    return <RepositoryInfo repository={repository} />;
  }

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
  container: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'column',
    gap: 5,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  reviewEnd: {
    flex: 1,
    gap: 5,
  },
  rating: {
    borderRadius: 50,
    fontSize: 24,
    textAlign: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 3,
    lineHeight: 60,
    height: 64,
    width: 64,
  },
});
