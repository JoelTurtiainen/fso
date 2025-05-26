import { useMutation, useQuery } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const variables = {
      credentials: {
        username: username,
        password: password,
      },
    };

    return await mutate({ variables });
  };

  return [signIn, result];
};

export default useSignIn;
