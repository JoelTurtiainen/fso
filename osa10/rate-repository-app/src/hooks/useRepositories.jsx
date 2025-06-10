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

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      ...sortVariables[variables.sortQuery],
      ...variables,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
