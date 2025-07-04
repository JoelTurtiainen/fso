import { View, StyleSheet } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { ScrollView } from 'react-native';
import { GET_CURRENT_USER } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const { data: currentUserObject } = useQuery(GET_CURRENT_USER, {
    context: {
      headers: { authorization: `Bearer ${authStorage.getAccessToken()}` },
    },
  });

  const onSignOut = async (navigate) => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  const loggedIn =
    currentUserObject &&
    currentUserObject.hasOwnProperty('me') &&
    currentUserObject.me !== null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text fontWeight="bold" color="bgPrimary">
            Repositories
          </Text>
        </Link>
        {loggedIn ? (
          <>
            <Link to="/newreview" style={styles.link}>
              <Text fontWeight="bold" color="bgPrimary">
                Create a review
              </Text>
            </Link>
            <Link to="/myreviews" style={styles.link}>
              <Text fontWeight="bold" color="bgPrimary">
                My reviews
              </Text>
            </Link>
            <Link onPress={() => onSignOut(navigate)} style={styles.link}>
              <Text fontWeight="bold" color="bgPrimary">
                Sign out
              </Text>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin" style={styles.link}>
              <Text fontWeight="bold" color="bgPrimary">
                Sign in
              </Text>
            </Link>
            <Link to="/signup" style={styles.link}>
              <Text fontWeight="bold" color="bgPrimary">
                Sign up
              </Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    padding: 5,
  },
  link: {
    padding: 10,
  },
});

export default AppBar;
