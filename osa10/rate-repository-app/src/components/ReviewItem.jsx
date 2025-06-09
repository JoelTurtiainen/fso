import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const ReviewItem = ({ review }) => {
  const title = review?.user?.username
    ? review.user.username
    : review.repository.fullName;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.rating} color={'primary'} fontWeight={'bold'}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewEnd}>
        <Text fontWeight={'bold'}>{title}</Text>
        <Text color={'textSecondary'}>
          {format(review.createdAt, 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  container: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default ReviewItem;
