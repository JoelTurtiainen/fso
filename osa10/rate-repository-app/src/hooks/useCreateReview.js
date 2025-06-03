import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useCreateReview = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const create = async ({ repositoryName, ownerName, rating, text }) => {
    const accessToken = await authStorage.getAccessToken();
    const variables = {
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      review: {
        repositoryName,
        ownerName,
        rating,
        text,
      },
    };
    await mutate({ variables });
  };

  return [create, result];
};

export default useCreateReview;
