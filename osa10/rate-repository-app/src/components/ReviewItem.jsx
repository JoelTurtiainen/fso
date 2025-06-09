import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import alert from './alert';
import Text from './Text';
import theme from '../theme';
import { Button } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const deleteAlert = async (id, deleteReview, refetch) =>
  alert('Delete Review', 'Are you sure you want to delete this review', [
    {
      text: 'CANCEL',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'DELETE',
      onPress: async () => {
        await deleteReview(id);
        refetch();
      },
    },
  ]);

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview, result] = useDeleteReview();

  const title = review?.user?.username
    ? review.user.username
    : review.repository.fullName;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View>
          <Text style={styles.rating} color={'primary'} fontWeight={'bold'}>
            {review.rating}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.reviewEnd}>
            <Text fontWeight={'bold'}>{title}</Text>
            <Text color={'textSecondary'}>
              {format(review.createdAt, 'dd.MM.yyyy')}
            </Text>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>

      {/* Review actions should be visible on my reviews page */}
      {review?.repository?.fullName && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            buttonColor={theme.colors.primary}
            onPress={() => navigate(`/${review.repository.id}`)}
          >
            View repository
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            buttonColor={theme.colors.error}
            onPress={() => deleteAlert(review.id, deleteReview, refetch)}
          >
            Delete review
          </Button>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  reviewEnd: {
    flex: 1,
    gap: 5,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderRadius: 50,
    borderWidth: 3,
    flex: 0,
    flexShrink: 1,
    fontSize: 24,
    height: 64,
    lineHeight: 60,
    textAlign: 'center',
    width: 64,
  },
  buttonContainer: {
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
  },
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default ReviewItem;
