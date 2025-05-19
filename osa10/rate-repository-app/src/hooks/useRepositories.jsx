import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  return { ...data, loading };
};

export default useRepositories;
