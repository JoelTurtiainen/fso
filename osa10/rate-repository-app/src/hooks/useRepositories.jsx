import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const sortVariables = {
  latest: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  ratingDesc: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  ratingAsc: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const useRepositories = ({ sortQuery, searchKeyword }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { ...sortVariables[sortQuery], searchKeyword },
  });

  return { ...data, loading };
};

export default useRepositories;
