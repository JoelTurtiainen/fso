import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useDeleteReview = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const accessToken = await authStorage.getAccessToken();
    const variables = {
      deleteReviewId: id,
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    };
    await mutate({ variables });
  };

  return [deleteReview, result];
};

export default useDeleteReview;
