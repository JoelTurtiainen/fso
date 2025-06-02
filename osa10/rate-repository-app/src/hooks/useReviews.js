import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const useReviews = ({ id }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY_REVIEWS, {
    variables: { id },
  });

  const reviews = data?.repository?.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviews);
  return { reviews, loading };
};

export default useReviews;
