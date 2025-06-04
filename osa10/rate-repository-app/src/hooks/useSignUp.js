import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [createUser, { error }] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const variables = {
      user: {
        username: username,
        password: password,
      },
    };

    await createUser({ variables });
  };

  return [signUp, error];
};

export default useSignUp;
