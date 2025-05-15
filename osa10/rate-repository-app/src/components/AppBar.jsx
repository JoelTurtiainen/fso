import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    padding: 12,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text fontWeight="bold" color="bgPrimary">
          Repositories
        </Text>
      </Link>
      <Link to="/signin">
        <Text fontWeight="bold" color="bgPrimary">
          Sign in
        </Text>
      </Link>
    </View>
  );
};

export default AppBar;
