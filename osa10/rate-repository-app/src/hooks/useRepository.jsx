import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ id }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  return { ...data, loading };
};

export default useRepository;
